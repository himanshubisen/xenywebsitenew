/**
 * Audio Processor
 * Handles audio capture from microphone and playback of agent responses
 */
class AudioProcessor {
  private voiceClient: any;
  private mediaStream: MediaStream | null;
  private audioContext: AudioContext | null;
  private sourceNode: MediaStreamAudioSourceNode | null;
  private processorNode: ScriptProcessorNode | null;
  private isRecording: boolean;
  private audioQueue: string[];
  private isPlaying: boolean;
  private currentSource: AudioBufferSourceNode | null;
  private sampleRate: number;
  private channels: number;

  constructor(voiceClient: any) {
    this.voiceClient = voiceClient;
    this.mediaStream = null;
    this.audioContext = null;
    this.sourceNode = null;
    this.processorNode = null;
    this.isRecording = false;
    this.audioQueue = [];
    this.isPlaying = false;
    this.currentSource = null;
    this.sampleRate = 24000;
    this.channels = 1;

    // Set up audio playback handlers
    this.setupPlaybackHandlers();
  }

  /**
   * Initialize audio context and get microphone permission
   */
  async initialize(): Promise<boolean> {
    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: this.sampleRate
      });

      // Request microphone access
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: this.sampleRate,
          channelCount: this.channels,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      console.log('Microphone access granted');
      return true;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
      throw new Error('Microphone access denied');
    }
  }

  /**
   * Set up handlers for audio playback from agent
   */
  setupPlaybackHandlers() {
    this.voiceClient.on('audio_delta', (audioBase64: string) => {
      this.queueAudio(audioBase64);
    });

    this.voiceClient.on('audio_done', () => {
      this.voiceClient.emit('audio_end');
    });

    // Handle user speech start (interruption)
    this.voiceClient.on('user_speech_start', () => {
      console.log('User started speaking - stopping agent audio');
      this.stopPlayback();
    });
  }

  /**
   * Start recording audio from microphone
   */
  async startRecording(): Promise<void> {
    if (this.isRecording) return;

    try {
      // Ensure audio context is running
      if (this.audioContext && this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      if (!this.mediaStream || !this.audioContext) {
        throw new Error('Audio not initialized');
      }

      // Create audio source from media stream
      this.sourceNode = this.audioContext.createMediaStreamSource(this.mediaStream);

      // Create script processor for audio processing
      const bufferSize = 4096;
      this.processorNode = this.audioContext.createScriptProcessor(
        bufferSize,
        this.channels,
        this.channels
      );

      this.processorNode.onaudioprocess = (event) => {
        if (!this.isRecording) return;

        const inputData = event.inputBuffer.getChannelData(0);

        // Convert Float32Array to Int16Array (PCM)
        const pcmData = this.floatTo16BitPCM(inputData);

        // Convert to base64
        const buffer = pcmData.buffer as ArrayBuffer;
        const base64Audio = this.arrayBufferToBase64(buffer);

        // Send to server
        this.voiceClient.sendAudio(base64Audio);
      };

      // Connect nodes
      if (this.sourceNode && this.processorNode) {
        this.sourceNode.connect(this.processorNode);
        this.processorNode.connect(this.audioContext.destination);
      }

      this.isRecording = true;
      console.log('Recording started');
    } catch (error) {
      console.error('Failed to start recording:', error);
      throw error;
    }
  }

  /**
   * Stop recording audio
   */
  stopRecording(): void {
    if (!this.isRecording) return;

    this.isRecording = false;

    if (this.processorNode) {
      this.processorNode.disconnect();
      this.processorNode = null;
    }

    if (this.sourceNode) {
      this.sourceNode.disconnect();
      this.sourceNode = null;
    }

    // Signal end of audio to server
    this.voiceClient.endAudio();

    console.log('Recording stopped');
  }

  /**
   * Queue audio for playback
   * @param {string} audioBase64 - Base64 encoded audio data
   */
  queueAudio(audioBase64: string): void {
    console.log('Queuing audio chunk for playback, queue size:', this.audioQueue.length + 1);
    this.audioQueue.push(audioBase64);
    if (!this.isPlaying) {
      console.log('Starting audio playback');
      this.playNextAudio();
    }
  }

  /**
   * Play next audio chunk in queue
   */
  async playNextAudio(): Promise<void> {
    if (this.audioQueue.length === 0) {
      this.isPlaying = false;
      return;
    }

    this.isPlaying = true;

    if (!this.voiceClient.eventHandlers['audio_start']) {
      this.voiceClient.emit('audio_start');
    }

    const audioBase64 = this.audioQueue.shift();

    try {
      if (!audioBase64 || !this.audioContext) {
        throw new Error('No audio data or audio context');
      }

      // Decode base64 to Uint8Array (won't get detached)
      const audioBytes = this.base64ToUint8Array(audioBase64);

      // Try to decode as encoded audio (MP3, WAV, etc.)
      try {
        // Create a copy of the buffer for decodeAudioData
        const buffer = audioBytes.buffer.slice(0) as ArrayBuffer;
        const audioBuffer = await this.audioContext.decodeAudioData(buffer);
        this.playAudioBuffer(audioBuffer);
      } catch (decodeError) {
        // If decoding fails, assume it's raw PCM16 data from Azure
        console.log('Decoding as raw PCM16 audio');
        const audioBuffer = this.pcm16ToAudioBuffer(audioBytes);
        this.playAudioBuffer(audioBuffer);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      this.playNextAudio();
    }
  }

  /**
   * Convert PCM16 data to AudioBuffer
   * @param {Uint8Array} audioBytes - Raw PCM16 audio data as Uint8Array
   * @returns {AudioBuffer}
   */
  pcm16ToAudioBuffer(audioBytes: Uint8Array): AudioBuffer {
    try {
      // Convert bytes to Int16Array (PCM16 is 16-bit signed integers)
      // Each sample is 2 bytes (16 bits)
      const numSamples = audioBytes.length / 2;
      const int16Array = new Int16Array(numSamples);

      // Manually read 16-bit values from byte array
      for (let i = 0; i < numSamples; i++) {
        const byte1 = audioBytes[i * 2];
        const byte2 = audioBytes[i * 2 + 1];
        // Combine two bytes into a 16-bit signed integer (little-endian)
        int16Array[i] = (byte2 << 8) | byte1;
        // Convert to signed if needed
        if (int16Array[i] > 32767) {
          int16Array[i] -= 65536;
        }
      }

      console.log('PCM16 data length:', int16Array.length, 'samples');

      if (!this.audioContext) {
        throw new Error('Audio context not available');
      }

      // Create audio buffer
      const audioBuffer = this.audioContext.createBuffer(
        this.channels,
        int16Array.length,
        this.sampleRate
      );

      // Convert Int16 to Float32 and copy to audio buffer
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        // Convert from Int16 range (-32768 to 32767) to Float32 range (-1.0 to 1.0)
        float32Array[i] = int16Array[i] / (int16Array[i] < 0 ? 32768 : 32767);
      }

      // Copy to audio buffer
      audioBuffer.copyToChannel(float32Array, 0);

      return audioBuffer;
    } catch (error) {
      console.error('Error converting PCM16 to AudioBuffer:', error);
      throw error;
    }
  }

  /**
   * Play an audio buffer
   * @param {AudioBuffer} audioBuffer
   */
  playAudioBuffer(audioBuffer: AudioBuffer): void {
    // Ensure audio context is running
    if (this.audioContext && this.audioContext.state === 'suspended') {
      console.log('Resuming suspended audio context');
      this.audioContext.resume();
    }

    if (!this.audioContext) {
      console.error('Audio context not available');
      return;
    }

    console.log('Playing audio buffer:', audioBuffer.duration, 'seconds,', audioBuffer.numberOfChannels, 'channels,', audioBuffer.sampleRate, 'Hz');

    // Stop any currently playing audio
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch (e) {
        // Already stopped
      }
    }

    // Create buffer source
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext.destination);

    // Store reference to current source for interruption
    this.currentSource = source;

    // Play audio
    source.start(0);
    console.log('Audio playback started');

    // Wait for audio to finish
    source.onended = () => {
      console.log('Audio chunk finished playing');
      this.currentSource = null;
      this.playNextAudio();
    };
  }

  /**
   * Convert Float32Array to 16-bit PCM
   * @param {Float32Array} float32Array
   * @returns {Int16Array}
   */
  floatTo16BitPCM(float32Array: Float32Array): Int16Array {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return int16Array;
  }

  /**
   * Convert ArrayBuffer to base64
   * @param {ArrayBuffer} buffer
   * @returns {string}
   */
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  /**
   * Convert base64 to Uint8Array
   * @param {string} base64
   * @returns {Uint8Array}
   */
  base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  /**
   * Convert base64 to ArrayBuffer (legacy method)
   * @param {string} base64
   * @returns {ArrayBuffer}
   */
  base64ToArrayBuffer(base64: string): ArrayBuffer {
    return this.base64ToUint8Array(base64).buffer as ArrayBuffer;
  }

  /**
   * Stop audio playback immediately (for interruptions)
   */
  stopPlayback(): void {
    // Clear the audio queue
    this.audioQueue = [];
    this.isPlaying = false;

    // Stop any currently playing audio
    if (this.currentSource) {
      try {
        this.currentSource.stop();
        this.currentSource = null;
      } catch (e) {
        // Already stopped
      }
    }

    console.log('Audio playback stopped (interrupted)');
  }

  /**
   * Cleanup resources
   */
  cleanup(): void {
    this.stopRecording();
    this.stopPlayback();

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    console.log('Audio processor cleaned up');
  }
}

export default AudioProcessor;