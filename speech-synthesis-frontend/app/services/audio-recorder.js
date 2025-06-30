// app/services/audio-recorder.js
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { AssemblyAI } from 'assemblyai';
import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';

//b0fba1026f514760a9362dccbb8d7fee
//19a1774a48034202e4e7650b2c9706a393ee8f39
export default class AudioRecorderService extends Service {
  @tracked isConnected = false;
  @tracked isRecording = false;
  @tracked fullTranscription = [];
  
  connection;
  get transcription() {
    console.log(this.fullTranscription.join('\n'));
    return this.fullTranscription.join(' ');
  }


  get isSafari(){
  return /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)
  } 
    get audioConstraints(){
    return this.isSafari ? {
        // Configuration Safari plus permissive
        audio: {
          sampleRate: { ideal: 48000 },
          channelCount: { ideal: 1 },
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      } : {
        // Configuration Chrome plus stricte
        audio: {
          channelCount: 1,
          sampleRate: 48000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      };
    }

  getSupportedMimeTypeForDeepgram() {
    const preferredTypes = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/wav',
      'audio/ogg;codecs=opus',
      'audio/mp4', // Safari fallback
    ];

    for (const type of preferredTypes) {
      if (MediaRecorder.isTypeSupported(type)) {
        console.log('✅ Format supporté:', type);
        return type;
      }
    }

    console.warn('⚠️ Aucun format préféré supporté, utilisation par défaut');
    return '';
  }

  @action
  async startStreaming() {
    const url = 'http://stream.live.vc.bbcmedia.co.uk/bbc_world_service';
    console.log(this.isSafari)
    try {
      this.error = null;

      // FIX: Vérifier/forcer une nouvelle demande de micro
      await this.ensureFreshMicrophoneAccess();

      await this.startMicrophone();
      await this.initializeWebSocketDeep();

    } catch (error) {
      this.error = error.message;
      console.error('Error starting streaming:', error);
    }
  }

  // FIX: Nouvelle méthode pour s'assurer d'avoir un accès micro frais
  async ensureFreshMicrophoneAccess() {
    try {
      if (this.stream) {
        console.log('🧹 Nettoyage ancien stream');
        this.stream.getTracks().forEach((track) => track.stop());
        this.stream = null;
      }

      console.log("🎤 Demande d'accès microphone...");




      const testStream = await navigator.mediaDevices.getUserMedia(this.audioConstraints);
      // Vérifier que le stream est actif
      const audioTracks = testStream.getAudioTracks();
      if (audioTracks.length === 0 || audioTracks[0].readyState !== 'live') {
        throw new Error('Stream audio non actif');
      }

      console.log(
        '✅ Accès microphone confirmé, track état:',
        audioTracks[0].readyState,
      );

      // Fermer le stream de test
      testStream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error('❌ Erreur accès microphone:', error);
      throw new Error(
        "Impossible d'accéder au microphone. Veuillez autoriser l'accès.",
      );
    }
  }

  stopStreaming() {
    console.log('🛑 Arrêt du streaming en cours...');

    try {
      // 1. Arrêter l'enregistrement MediaRecorder
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        console.log('📱 Arrêt MediaRecorder...');
        this.mediaRecorder.stop();
        this.isRecording = false;
      }

      // 2. Arrêter et nettoyer le stream audio
      if (this.stream) {
        console.log('🎤 Fermeture du stream microphone...');
        this.stream.getTracks().forEach((track) => {
          console.log(
            `🔇 Arrêt du track: ${track.kind}, état: ${track.readyState}`,
          );
          track.stop();
        });
        this.stream = null;
      }

      // 3. Envoyer le message de fermeture à Deepgram
      if (this.connection && this.connection.getReadyState() === 1) {
        console.log('📤 Envoi message de fermeture à Deepgram...');
        const closeMessage = JSON.stringify({ type: 'CloseStream' });
        this.connection.send(closeMessage);
      }

      // 4. Fermer la connexion Deepgram après un délai
      setTimeout(() => {
        if (this.connection) {
          console.log('🔌 Fermeture connexion Deepgram...');
          // this.connection.close();
          this.connection = null;
        }
        this.isConnected = false;
      }, 1000); // Laisser le temps à Deepgram de traiter les dernières données

      // 5. Nettoyer les données
      this.audioChunks = [];
      this.error = null;

      console.log('✅ Streaming arrêté avec succès');
    } catch (error) {
      console.error("❌ Erreur lors de l'arrêt du streaming:", error);

      // Forcer le nettoyage même en cas d'erreur
      this.isRecording = false;
      this.isConnected = false;
      this.stream = null;
      this.connection = null;
      this.audioChunks = [];
    }
  }
  async initializeWebSocketDeep() {
    try {
      //hard
      const deepgram = createClient('49fea15aaa90ec2595d02fdf1776cbffc45764b3');

      this.connection = deepgram.listen.live({
        model: 'nova-2',
        language: 'fr',
        smart_format: true,
        interim_results: true,
        sample_rate: 48000, // FIX: Correspondre à la config micro
      });

      console.log('Deepgram client:', deepgram);
      console.log('Connection créée:', this.connection); // FIX: this.connection au lieu de connection

      // FIX: Supprimer le handler onmessage (incompatible avec le SDK)
      // this.connection.onmessage = (event) => { ... };

      // CORRECTION: Tous les event listeners AVANT l'événement Open
      this.connection.on(LiveTranscriptionEvents.Open, () => {
        console.log('✅ Connexion Deepgram ouverte !');
        this.isConnected = true;

        // FIX: Démarrer l'enregistrement SEULEMENT quand Deepgram est prêt
        if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
          console.log('🎤 Démarrage enregistrement après ouverture connexion');
          this.mediaRecorder.start(250);
        }
      });

      this.connection.on(LiveTranscriptionEvents.Close, () => {
        console.log('🔌 Connexion fermée');
        this.isConnected = false;
      });

      this.connection.on(LiveTranscriptionEvents.Transcript, (data) => {
        console.log('📝 Données de transcription reçues:', data);

        // Vérification des données
        if (data.channel?.alternatives?.[0]?.transcript) {
          const transcript = data.channel.alternatives[0].transcript;
          if (data.is_final) {
            this.fullTranscription = [...this.fullTranscription, transcript];
          }
          console.log('✨ Transcription:', this.fullTranscription);
        } else {
          console.log('⚠️ Pas de transcription dans les données:', data);
        }
      });

      this.connection.on(LiveTranscriptionEvents.Metadata, (data) => {
        console.log('📊 Métadonnées:', data);
      });

      this.connection.on(LiveTranscriptionEvents.Error, (err) => {
        console.error('❌ Erreur Deepgram:', err); // FIX: console.error au lieu de console.erlogror
      });
    } catch (error) {
      console.log("❌ Erreur lors de l'initialisation:", error);
      throw error;
    }
  }

  get isSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  async startMicrophone() {
    if (!this.isSupported) {
      throw new Error('Enregistrement audio non supporté par ce navigateur');
    }

    try {
      // FIX: Nouvelle demande microphone (même si on a déjà testé)
      console.log('🎤 Initialisation stream microphone...');
      this.stream = await navigator.mediaDevices.getUserMedia(this.audioConstraints);

      // FIX: Vérifier que le stream est bien actif
      const audioTracks = this.stream.getAudioTracks();
      console.log('🔍 État du track audio:', {
        count: audioTracks.length,
        state: audioTracks[0]?.readyState,
        enabled: audioTracks[0]?.enabled,
      });

      // Créer MediaRecorder
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: this.getSupportedMimeTypeForDeepgram(),
        // FIX: Supprimer sample_rate (invalide pour MediaRecorder)
      });

      this.audioChunks = [];
      this.isRecording = true;

      // Événements MediaRecorder
      this.mediaRecorder.ondataavailable = (event) => {
        console.log('debug');
        if (event.data.size > 0) {
          if (this.connection && this.connection.getReadyState() === 1) {
            // Méthode 1: Envoyer directement le Blob
            this.connection.send(event.data);
            console.log('✅ Données envoyées à Deepgram');
          } else {
            console.log('⚠️ Connexion Deepgram non prête');
            this.audioChunks.push(event.data);
          }
        }
      };

      this.mediaRecorder.onstop = () => {
        console.log('🛑 MediaRecorder stop');
      };

      // FIX: Ne pas démarrer ici, attendre l'ouverture de Deepgram
      console.log(
        '📱 MediaRecorder configuré, en attente connexion Deepgram...',
      );
      // this.mediaRecorder.start(250); // Déplacé dans le listener Open
    } catch (error) {
      console.error("Erreur lors du démarrage de l'enregistrement:", error);
      throw error;
    }
  }

  // FIX: Méthode utilitaire pour diagnostiquer l'état
  diagnoseAudioState() {
    console.log('🔍 Diagnostic audio:', {
      hasStream: !!this.stream,
      streamActive: this.stream?.active,
      tracksCount: this.stream?.getAudioTracks().length,
      trackState: this.stream?.getAudioTracks()[0]?.readyState,
      mediaRecorderState: this.mediaRecorder?.state,
      connectionState: this.connection?.getReadyState(),
      isConnected: this.isConnected,
      isRecording: this.isRecording,
    });
  }




  reset() {
  console.log('♻️ Réinitialisation du service AudioRecorder...');

  try {
    // 1. Stopper le streaming en cours proprement
    this.stopStreaming();
  } catch (error) {
    console.warn('⚠️ Erreur pendant stopStreaming dans reset():', error);
  }

  // 2. Réinitialiser les propriétés tracked et internes
  this.isConnected = false;
  this.isRecording = false;
  this.fullTranscription = [];

  // 3. Réinitialiser les objets internes
  this.stream = null;
  this.mediaRecorder = null;
  this.audioChunks = [];
  this.error = null;

  // 4. Fermer explicitement la connexion WebSocket si encore ouverte
  if (this.connection && this.connection.getReadyState() === 1) {
    try {
      console.log('🔌 Fermeture manuelle de la connexion Deepgram...');
      this.connection.send(JSON.stringify({ type: 'CloseStream' }));
      this.connection.close();
    } catch (e) {
      console.warn('⚠️ Erreur lors de la fermeture manuelle de Deepgram:', e);
    }
  }
  this.connection = null;

  console.log('✅ Service AudioRecorder réinitialisé');
}

  //   async initializeWebSocket() {

  //     return new Promise((resolve, reject) => {

  //       this.ws = new WebSocket(  "wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=b0fba1026f514760a9362dccbb8d7fee"
  // );
  //       console.log(this.ws)

  //       // Note: WebSocket constructor in browser doesn't support headers directly
  //       // You might need to send the API key in the connection URL or as first message
  //       // For AssemblyAI, you typically send it as a header, but browser WebSocket API is limited
  //       // Consider using their JavaScript SDK or sending auth in first message

  //       this.ws.onopen = () => {
  //         console.log('WebSocket connection opened');
  //         console.log(`Connected to: ${this.apiEndpoint}`);
  //         this.isConnected = true;
  //         resolve();
  //       };

  //       this.ws.onmessage = (event) => {
  //         this.handleWebSocketMessage(event.data);
  //       };

  //       this.ws.onerror = (error) => {
  //         console.error('WebSocket Error:', error);
  //         this.error = 'WebSocket connection error';
  //         this.cleanup();
  //         reject(error);
  //       };

  //       this.ws.onclose = (event) => {
  //         console.log(`WebSocket Disconnected: Status=${event.code}, Reason=${event.reason}`);
  //         this.isConnected = false;
  //         this.cleanup();
  //       };
  //     });
  //   }

  //   handleWebSocketMessage(message) {
  //     try {
  //       const data = JSON.parse(message);
  //       const msgType = data.type;

  //       if (msgType === 'Begin') {
  //         this.sessionId = data.id;
  //         const expiresAt = data.expires_at;
  //         console.log(`Session began: ID=${this.sessionId}, ExpiresAt=${this.formatTimestamp(expiresAt)}`);
  //       } else if (msgType === 'Turn') {
  //         const transcript = data.transcript || '';
  //         const formatted = data.turn_is_formatted;

  //         if (formatted) {
  //           this.currentTranscript = transcript;
  //           console.log('Final transcript:', transcript);
  //           // Trigger any callbacks for final transcript
  //           this.onFinalTranscript?.(transcript);
  //         } else {
  //           this.currentTranscript = transcript;
  //           // Trigger any callbacks for partial transcript
  //           this.onPartialTranscript?.(transcript);
  //         }
  //       } else if (msgType === 'Termination') {
  //         const audioDuration = data.audio_duration_seconds;
  //         const sessionDuration = data.session_duration_seconds;
  //         console.log(`Session Terminated: Audio Duration=${audioDuration}s, Session Duration=${sessionDuration}s`);
  //         this.onSessionTerminated?.(data);
  //       }
  //     } catch (error) {
  //       console.error('Error handling message:', error);
  //       console.error('Message data:', message);
  //     }
  //   }

  //   async startMicrophone() {
  //     try {
  //       // Request microphone access
  //       this.audioStream = await navigator.mediaDevices.getUserMedia({
  //         audio: {
  //           sampleRate: this.SAMPLE_RATE,
  //           channelCount: this.CHANNELS,
  //           echoCancellation: true,
  //           noiseSuppression: true,
  //         },
  //       });

  //       // Create audio context for processing
  //       this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
  //         sampleRate: this.SAMPLE_RATE,
  //       });

  //       const source = this.audioContext.createMediaStreamSource(this.audioStream);

  //       // Create ScriptProcessorNode for real-time audio processing
  //       this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

  //       this.processor.onaudioprocess = (event) => {
  //         if (this.ws && this.ws.readyState === WebSocket.OPEN && this.isRecording) {
  //           const inputBuffer = event.inputBuffer;
  //           const inputData = inputBuffer.getChannelData(0);

  //           // Convert Float32Array to Int16Array (PCM 16-bit)
  //           const pcmData = this.float32ToInt16(inputData);

  //           console.log(pcmData)
  //         }
  //       };

  //       source.connect(this.processor);
  //       this.processor.connect(this.audioContext.destination);

  //       // Also set up MediaRecorder for saving audio file
  //       this.setupMediaRecorder();

  //       this.isRecording = true;
  //       console.log('Microphone stream started successfully');
  //       console.log('Speaking into microphone...');

  //     } catch (error) {
  //       console.error('Error accessing microphone:', error);
  //       this.error = 'Microphone access denied or not available';
  //       throw error;
  //     }
  //   }

  //   setupMediaRecorder() {
  //     this.recordedChunks = [];

  //     this.mediaRecorder = new MediaRecorder(this.audioStream, {
  //       mimeType: 'audio/webm;codecs=opus',
  //     });

  //     this.mediaRecorder.ondataavailable = (event) => {
  //       if (event.data.size > 0) {
  //         this.recordedChunks.push(event.data);
  //       }
  //     };

  //     this.mediaRecorder.onstop = () => {
  //       this.saveRecordedAudio();
  //     };

  //     this.mediaRecorder.start(1000); // Collect data every second
  //   }

  //   float32ToInt16(float32Array) {
  //     const int16Array = new Int16Array(float32Array.length);
  //     for (let i = 0; i < float32Array.length; i++) {
  //       const sample = Math.max(-1, Math.min(1, float32Array[i]));
  //       int16Array[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  //     }
  //     return int16Array;
  //   }

  //   saveRecordedAudio() {
  //     if (this.recordedChunks.length === 0) {
  //       console.log('No audio data recorded');
  //       return;
  //     }

  //     const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
  //     const url = URL.createObjectURL(blob);

  //     // Create download link
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = `recorded_audio_${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}.webm`;
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);

  //     // Clean up
  //     URL.revokeObjectURL(url);

  //     console.log('Audio file downloaded');
  //   }

  //   cleanup() {
  //     this.isRecording = false;

  //     // Stop media recorder
  //     if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
  //       this.mediaRecorder.stop();
  //     }

  //     // Stop audio processing
  //     if (this.processor) {
  //       this.processor.disconnect();
  //       this.processor = null;
  //     }

  //     // Close audio context
  //     if (this.audioContext && this.audioContext.state !== 'closed') {
  //       this.audioContext.close();
  //       this.audioContext = null;
  //     }

  //     // Stop media stream
  //     if (this.audioStream) {
  //       this.audioStream.getTracks().forEach(track => track.stop());
  //       this.audioStream = null;
  //     }

  //     // Close WebSocket
  //     if (this.ws && [WebSocket.OPEN, WebSocket.CONNECTING].includes(this.ws.readyState)) {
  //       try {
  //         if (this.ws.readyState === WebSocket.OPEN) {
  //           const terminateMessage = { type: 'Terminate' };
  //           console.log('Sending termination message:', JSON.stringify(terminateMessage));
  //           this.ws.send(JSON.stringify(terminateMessage));
  //         }
  //         this.ws.close();
  //       } catch (error) {
  //         console.error('Error closing WebSocket:', error);
  //       }
  //       this.ws = null;
  //     }

  //     this.isConnected = false;
  //     this.currentTranscript = '';
  //     this.sessionId = null;
  //     this.recordedChunks = [];

  //     console.log('Cleanup complete');
  //   }

  //   formatTimestamp(timestamp) {
  //     return new Date(timestamp * 1000).toISOString();
  //   }

  //   // Callback methods - can be overridden or set by components
  //   onFinalTranscript = null;
  //   onPartialTranscript = null;
  //   onSessionTerminated = null;

  //   // Cleanup when service is destroyed
  //   willDestroy() {
  //     super.willDestroy();
  //     this.cleanup();
  //   }
  //   // @tracked isRecording = false;
  // @tracked isSupported = false;

  // mediaRecorder = null;
  // audioChunks = [];
  // stream = null;
  // websocket = null;

  // constructor() {
  //   super(...arguments);
  //   this.checkSupport();
  // }

  // checkSupport() {
  //   this.isSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  // }

  // async startRecording() {
  //   if (!this.isSupported) {
  //     throw new Error('Enregistrement audio non supporté par ce navigateur');
  //   }

  //   try {
  //     // Demander l'autorisation microphone
  //     this.stream = await navigator.mediaDevices.getUserMedia({
  //       audio: {
  //         channelCount: 1,
  //         sampleRate: 16000, // Optimal pour la plupart des APIs
  //         echoCancellation: true,
  //         noiseSuppression: true,
  //         autoGainControl: true
  //       }
  //     });

  //     // Créer MediaRecorder
  //     this.mediaRecorder = new MediaRecorder(this.stream, {
  //       mimeType: this.getSupportedMimeType()
  //     });

  //     this.audioChunks = [];
  //     this.isRecording = true;

  //     // Événements MediaRecorder
  //     this.mediaRecorder.ondataavailable = (event) => {
  //       if (event.data.size > 0) {
  //         this.audioChunks.push(event.data);
  //                     console.log(this.websocket)

  //         // Envoyer chunk en temps réel si WebSocket connecté
  //         if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
  //           this.sendAudioChunk(event.data);
  //         }
  //       }
  //     };

  //     this.mediaRecorder.onstop = () => {
  //           console.log('stop')

  //       this.processRecording();
  //     };
  //      await this.connectWebSocket();

  //     // Démarrer l'enregistrement avec chunks de 250ms pour temps réel
  //     this.mediaRecorder.start(250);

  //     // Optionnel : Connecter WebSocket pour transcription temps réel

  //   } catch (error) {
  //     console.error('Erreur lors du démarrage de l\'enregistrement:', error);
  //     throw error;
  //   }
  // }

  // @action
  // stopRecording() {
  //   console.log('st')
  //   if (this.mediaRecorder && this.isRecording) {
  //     this.mediaRecorder.stop();
  //     this.isRecording = false;

  //     // Arrêter le stream
  //     if (this.stream) {
  //       this.stream.getTracks().forEach(track => track.stop());
  //       this.stream = null;
  //     }

  //     // Fermer WebSocket si ouvert
  //     if (this.websocket) {
  //       this.websocket.close();
  //       this.websocket = null;
  //     }
  //   }
  // }

  // getSupportedMimeType() {
  //   const types = [
  //     'audio/webm;codecs=opus',
  //     'audio/webm',
  //     'audio/mp4',
  //     'audio/ogg;codecs=opus'
  //   ];

  //   return types.find(type => MediaRecorder.isTypeSupported(type)) || '';
  // }

  // async processRecording() {
  //   if (this.audioChunks.length === 0) return;

  //   // Créer blob audio
  //   const audioBlob = new Blob(this.audioChunks, {
  //     type: this.getSupportedMimeType()
  //   });

  //   // Convertir en ArrayBuffer pour l'API
  //   const arrayBuffer = await audioBlob.arrayBuffer();

  //   // Envoyer à l'API de transcription
  //   return this.sendToTranscriptionAPI(arrayBuffer);
  // }

  // // Méthode pour AssemblyAI (exemple)
  // async sendToTranscriptionAPI(audioData) {
  //   const ASSEMBLY_AI_API_KEY = 'your-api-key';

  //   try {
  //     // 1. Upload audio
  //     const uploadUrl = await this.uploadAudio(audioData, ASSEMBLY_AI_API_KEY);

  //     // 2. Demander transcription
  //     const transcriptId = await this.requestTranscription(uploadUrl, ASSEMBLY_AI_API_KEY);

  //     // 3. Récupérer résultat
  //     return await this.getTranscriptionResult(transcriptId, ASSEMBLY_AI_API_KEY);

  //   } catch (error) {
  //     console.error('Erreur API de transcription:', error);
  //     throw error;
  //   }
  // }

  // async uploadAudio(audioData, apiKey) {
  //   const response = await fetch('https://api.assemblyai.com/v2/upload', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': apiKey,
  //       'Content-Type': 'application/octet-stream'
  //     },
  //     body: audioData
  //   });

  //   const data = await response.json();
  //   return data.upload_url;
  // }

  // async requestTranscription(audioUrl, apiKey) {
  //   const response = await fetch('https://api.assemblyai.com/v2/transcript', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': apiKey,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       audio_url: audioUrl,
  //       language_code: 'fr' // Français
  //     })
  //   });

  //   const data = await response.json();
  //   return data.id;
  // }

  // async getTranscriptionResult(transcriptId, apiKey) {
  //   const maxAttempts = 30; // 30 secondes max
  //   let attempts = 0;

  //   while (attempts < maxAttempts) {
  //     const response = await fetch(
  //       `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
  //       {
  //         headers: { 'Authorization': apiKey }
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.status === 'completed') {
  //       return data.text;
  //     } else if (data.status === 'error') {
  //       throw new Error('Erreur de transcription');
  //     }

  //     // Attendre 1 seconde avant de réessayer
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //     attempts++;
  //   }

  //   throw new Error('Timeout de transcription');
  // }

  // // WebSocket pour temps réel (AssemblyAI)
  // async connectWebSocket() {
  //   const ASSEMBLY_AI_API_KEY = 'b0fba1026f514760a9362dccbb8d7fee';

  //   this.websocket = new WebSocket(
  //     `wss://streaming.assemblyai.com/v3/ws?sample_rate=16000&token=${ASSEMBLY_AI_API_KEY}`
  //   );

  //   this.websocket.onopen = () => {
  //     console.log('WebSocket connecté');
  //   };

  //   this.websocket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log(data)
  //     if (data.message_type === 'FinalTranscript') {
  //       // Émettre événement avec texte transcrit
  //       this.onTranscriptionReceived?.(data.text);
  //     }
  //   };

  //   this.websocket.onerror = (error) => {
  //     console.error('Erreur WebSocket:', error);
  //   };
  // }

  // sendAudioChunk(audioChunk) {
  //   if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
  //     // Convertir en base64 pour AssemblyAI
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const base64Audio = reader.result.split(',')[1];
  //       this.websocket.send(JSON.stringify({
  //         audio_data: base64Audio
  //       }));

  //     };
  //     reader.readAsDataURL(audioChunk);
  //   }
  // }

  // // Callback pour recevoir transcriptions temps réel
  // onTranscriptionReceived = null;
}
