// app/services/audio-recorder.js
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';

//b0fba1026f514760a9362dccbb8d7fee
//19a1774a48034202e4e7650b2c9706a393ee8f39
export default class AudioRecorderService extends Service {
  @tracked isConnected = false;
  @tracked isRecording = false;
  @tracked fullTranscription = [];
  
  connection;


  gladiaSocket;


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
          sampleRate: { ideal: 16000 },
          channelCount: { ideal: 1 },
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      } : {
        // Configuration Chrome plus stricte
        audio: {
          channelCount: 1,
      sampleRate: 16000, // ← Correspondre à Gladia
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

      await this.startMicrophoneForGladia();
    //  await this.initializeWebSocketDeep();
      await this.initializeWebSocketGladia()
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
    this.gladiaSocket.send(JSON.stringify({
    type: "stop_recording",
  }));

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
            this.gladiaSocket.send(event.data);
          // if (this.connection && this.connection.getReadyState() === 1) {
          //   // Méthode 1: Envoyer directement le Blob
          //   this.connection.send(event.data);
          //   console.log('✅ Données envoyées à Deepgram');
          // } else {
          //   console.log('⚠️ Connexion Deepgram non prête');
          //   this.audioChunks.push(event.data);
          // }
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




async initializeWebSocketGladia(){
  const response = await fetch('https://api.gladia.io/v2/live', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Gladia-Key': 'd7b5cce9-000b-4f65-a970-fb24b5fa48b7',
    },
    body: JSON.stringify({
      encoding: 'wav/pcm',
      sample_rate: 16000,
      bit_depth: 16,
      channels: 1,
      diarization:true,
       "language_config": {
    "languages": ["fr"]
  }
    }),
  });
  if (!response.ok) {
    debugger
    // Look at the error message
    // It might be a configuration issue
    console.error(`${response.status}: ${(await response.text()) || response.statusText}`);
    process.exit(response.status);
  }

  const {id, url} = await response.json();

   this.gladiaSocket = new WebSocket(url);


  // ✅ Arrow functions pour préserver le contexte 'this'
  this.gladiaSocket.addEventListener("open", () => {
    this.isConnected = true;
    console.log("gladia connected");
    console.log(this.mediaRecorder); // ← Maintenant this.mediaRecorder sera défini
    
    if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
      console.log('🎤 Démarrage enregistrement gladia après ouverture connexion');
      this.mediaRecorder.start(250);
    }
  });
  this.gladiaSocket.addEventListener("error", function(error) {
    debugger
 
  });

  this.gladiaSocket.addEventListener("close", function({code, reason}) {
    debugger
    // The connection has been closed
    // If the "code" is equal to 1000, it means we closed intentionally the connection (after the end of the session for example).
    // Otherwise, you can reconnect to the same url.
  });

  this.gladiaSocket.addEventListener("message", function(event) {
    
    // All the messages we are sending are in JSON format
    const message = JSON.parse(event.data.toString());
    console.log("message de gladia : ")
    console.log(message);
  });

}


// Méthode pour convertir Float32Array en WAV/PCM 16-bit
convertFloat32ToInt16(float32Array) {
  const int16Array = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    // Convertir de [-1, 1] vers [-32768, 32767]
    const sample = Math.max(-1, Math.min(1, float32Array[i]));
    int16Array[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
  }
  return int16Array;
}

// Nouvelle méthode pour démarrer le microphone avec conversion WAV
async startMicrophoneForGladia() {
  if (!this.isSupported) {
    throw new Error('Enregistrement audio non supporté par ce navigateur');
  }

  try {
    console.log('🎤 Initialisation stream microphone pour Gladia...');
    
    // Configuration spécifique pour Gladia (16kHz)
    const gladiaConstraints = {
      audio: {
        channelCount: 1,
        sampleRate: 16000, // Gladia préfère 16kHz
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    };

    this.stream = await navigator.mediaDevices.getUserMedia(gladiaConstraints);

    // Créer un contexte audio pour la conversion
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
      sampleRate: 16000
    });

    const source = this.audioContext.createMediaStreamSource(this.stream);
    
    // Utiliser ScriptProcessor (déprécié mais plus compatible) ou AudioWorklet
    this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
    
    this.processor.onaudioprocess = (event) => {
      if (this.gladiaSocket && this.gladiaSocket.readyState === WebSocket.OPEN) {
        const inputBuffer = event.inputBuffer;
        const inputData = inputBuffer.getChannelData(0);
        
        // Convertir en PCM 16-bit
        const pcmData = this.convertFloat32ToInt16(inputData);
        
        // Envoyer les données binaires directement
        this.gladiaSocket.send(pcmData.buffer);
      }
    };

    source.connect(this.processor);
    this.processor.connect(this.audioContext.destination);

    this.isRecording = true;
    console.log('✅ Microphone configuré pour Gladia avec conversion WAV/PCM');

  } catch (error) {
    console.error("Erreur lors du démarrage de l'enregistrement Gladia:", error);
    throw error;
  }
}



}



