// app/services/audio-recorder.js
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AudioRecorderService extends Service {
  @tracked isConnected = false;
  @tracked isRecording = false;
  @tracked fullTranscription = [];
  @tracked micError = false;
  @tracked transcriptError = false;
  @tracked error = null;

  // Configuration Gladia
  GLADIA_API_KEY = 'd7b5cce9-000b-4f65-a970-fb24b5fa48b7';
  GLADIA_API_URL = 'https://api.gladia.io/v2/live';
  
  // Propriétés internes
  gladiaSocket = null;
  stream = null;
  audioContext = null;
  processor = null;
  connectionClosed = false;

  get transcription() {
    return this.fullTranscription.join(' ');
  }

  get isSafari() {
    return /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
  }

  get audioConstraints() {
    return {
      audio: {
        channelCount: 1,
        sampleRate: 16000, // Optimisé pour Gladia
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    };
  }

  get isSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  @action
  async startStreaming() {
    if (this.micError) {
      this.handleMicError();
      return;
    }

    try {
      this.error = null;
      this.transcriptError = false;
      
      await this.ensureFreshMicrophoneAccess();
      await this.initializeWebSocketGladia();
      await this.startMicrophoneForGladia();

    } catch (error) {
      this.handleError('Erreur lors du démarrage du streaming', error);
    }
  }

  async ensureFreshMicrophoneAccess() {
    try {
      // Nettoyer l'ancien stream
      if (this.stream) {
        console.log('🧹 Nettoyage ancien stream');
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }

      console.log("🎤 Demande d'accès microphone...");
      const testStream = await navigator.mediaDevices.getUserMedia(this.audioConstraints);
      
      // Vérifier l'état du stream
      const audioTracks = testStream.getAudioTracks();
      if (audioTracks.length === 0 || audioTracks[0].readyState !== 'live') {
        throw new Error('Stream audio non actif');
      }

      console.log('✅ Accès microphone confirmé');
      testStream.getTracks().forEach(track => track.stop());
      
    } catch (error) {
      this.micError = true;
      throw new Error("Impossible d'accéder au microphone. Veuillez autoriser l'accès.");
    }
  }

  async initializeWebSocketGladia() {
    try {
      const response = await fetch(this.GLADIA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gladia-Key': this.GLADIA_API_KEY,
        },
        body: JSON.stringify({
          encoding: 'wav/pcm',
          sample_rate: 16000,
          bit_depth: 16,
          channels: 1,
          "language_config": {
            "languages": ["fr"]
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur API Gladia: ${response.status} - ${errorText}`);
      }

      const { id, url } = await response.json();
      this.gladiaSocket = new WebSocket(url);

      // Configuration des event listeners avec gestion d'erreur
      this.setupWebSocketListeners();

    } catch (error) {
      this.transcriptError = true;
      throw new Error(`Erreur initialisation Gladia: ${error.message}`);
    }
  }

  setupWebSocketListeners() {
    this.gladiaSocket.addEventListener("open", () => {
      this.isConnected = true;
      this.connectionClosed = false;
      console.log("✅ Connexion Gladia établie");
    });

    this.gladiaSocket.addEventListener("error", (error) => {
      console.error("❌ Erreur WebSocket Gladia:", error);
      this.transcriptError = true;
      this.handleError('Erreur de connexion WebSocket', error);
    });

    this.gladiaSocket.addEventListener("close", ({ code, reason }) => {
      this.connectionClosed = true;
      this.isConnected = false;
      console.log(`🔌 Connexion Gladia fermée - Code: ${code}, Raison: ${reason}`);
      
      // Reconnexion automatique si fermeture inattendue
      if (code !== 1000 && !this.connectionClosed) {
        this.attemptReconnection();
      }
    });

    this.gladiaSocket.addEventListener("message", (event) => {
      try {
        const message = JSON.parse(event.data.toString());
        this.handleGladiaMessage(message);
      } catch (error) {
        console.error("❌ Erreur parsing message Gladia:", error);
      }
    });
  }

  handleGladiaMessage(message) {
    switch (message.type) {
      case 'transcript':
        if (message.data.is_final) {
          console.log("✅ Transcription finale:", message.data.utterance.text);
          const transcript = message.data.utterance.text;
          this.fullTranscription = [...this.fullTranscription, transcript];
        } else {
          console.log("📝 Transcription partielle:", message.data.utterance.text);
        }
        break;
      
      case 'audio_chunk':
        // Gérer les chunks audio si nécessaire
        break;
        
      default:
        console.log(`📨 Message Gladia non géré: ${message.type}`);
    }
  }

  async startMicrophoneForGladia() {
    if (!this.isSupported) {
      throw new Error('Enregistrement audio non supporté par ce navigateur');
    }

    try {
      console.log('🎤 Initialisation microphone pour Gladia...');
      
      this.stream = await navigator.mediaDevices.getUserMedia(this.audioConstraints);
      
      // Créer le contexte audio
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 16000
      });

      const source = this.audioContext.createMediaStreamSource(this.stream);
      
      // Utiliser ScriptProcessor (plus compatible que AudioWorklet)
      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
      
      this.processor.onaudioprocess = (event) => {
        if (this.gladiaSocket && this.gladiaSocket.readyState === WebSocket.OPEN) {
          const inputBuffer = event.inputBuffer;
          const inputData = inputBuffer.getChannelData(0);
          
          // Convertir en PCM 16-bit
          const pcmData = this.convertFloat32ToInt16(inputData);
          this.gladiaSocket.send(pcmData.buffer);
        }
      };

      source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);

      this.isRecording = true;
      console.log('✅ Microphone configuré pour Gladia');

    } catch (error) {
      throw new Error(`Erreur démarrage microphone: ${error.message}`);
    }
  }

  convertFloat32ToInt16(float32Array) {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const sample = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
    }
    return int16Array;
  }

  stopStreaming() {
    console.log('🛑 Arrêt du streaming...');
    
    if (this.micError) {
      this.handleMicError();
      return;
    }

    try {
      // Arrêter l'enregistrement
      this.isRecording = false;
      
      // Envoyer signal d'arrêt à Gladia
      if (this.gladiaSocket && this.gladiaSocket.readyState === WebSocket.OPEN) {
        this.gladiaSocket.send(JSON.stringify({ type: "stop_recording" }));
      }

      // Nettoyer les ressources audio
      this.cleanupAudioResources();

      // Fermer WebSocket
      this.closeWebSocket();

      console.log('✅ Streaming arrêté');
      
    } catch (error) {
      console.error("❌ Erreur lors de l'arrêt:", error);
      this.forceCleanup();
    }
  }

  cleanupAudioResources() {
    // Arrêter le processeur audio
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }

    // Fermer le contexte audio
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }

    // Arrêter le stream
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        console.log(`🔇 Arrêt du track: ${track.kind}`);
        track.stop();
      });
      this.stream = null;
    }
  }

  closeWebSocket() {
    if (this.gladiaSocket) {
      if (this.gladiaSocket.readyState === WebSocket.OPEN) {
        this.gladiaSocket.close(1000, 'Fermeture normale');
      }
      this.gladiaSocket = null;
    }
    this.isConnected = false;
  }

  reset() {
    console.log('♻️ Réinitialisation du service...');
    
    try {
      this.stopStreaming();
    } catch (error) {
      console.warn('⚠️ Erreur pendant reset:', error);
    }

    // Réinitialiser les propriétés
    this.isConnected = false;
    this.isRecording = false;
    this.fullTranscription = [];
    this.micError = false;
    this.transcriptError = false;
    this.error = null;
    this.connectionClosed = false;

    console.log('✅ Service réinitialisé');
  }

  // Méthodes utilitaires pour la gestion d'erreur
  handleError(message, error) {
    console.error(`❌ ${message}:`, error);
    this.error = `${message}: ${error.message}`;
    alert(error)
    this.forceCleanup();
  }

  handleMicError() {
    console.warn('⚠️ Erreur microphone détectée - rechargement requis');
    // Au lieu de window.location.reload(), émettre un événement
    // ou utiliser le router Ember pour une meilleure UX
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }

  forceCleanup() {
    this.isRecording = false;
    this.isConnected = false;
    this.cleanupAudioResources();
    this.closeWebSocket();
    window.location.reload();

  }

  attemptReconnection() {
    console.log('🔄 Tentative de reconnexion...');
    setTimeout(() => {
      if (!this.isConnected && !this.connectionClosed) {
        this.startStreaming();
      }
    }, 2000);
  }

  // Méthode de diagnostic (utile pour le debug)
  diagnoseAudioState() {
    console.log('🔍 Diagnostic audio:', {
      hasStream: !!this.stream,
      streamActive: this.stream?.active,
      tracksCount: this.stream?.getAudioTracks().length,
      trackState: this.stream?.getAudioTracks()[0]?.readyState,
      audioContextState: this.audioContext?.state,
      gladiaSocketState: this.gladiaSocket?.readyState,
      isConnected: this.isConnected,
      isRecording: this.isRecording,
      hasError: !!this.error
    });
  }
}