class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input && input.length > 0) {
      const channelData = input[0];
      this.port.postMessage({
        type: 'audioData',
        data: Array.from(channelData) // Convert Float32Array to regular array for cloning
      });
    }
    return true;
  }
}

registerProcessor('audio-processor', AudioProcessor);