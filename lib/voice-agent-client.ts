/**
 * Voice Agent Client
 * Handles WebSocket connection to the backend server
 */
class VoiceAgentClient {
  private serverUrl: string;
  private ws: WebSocket | null;
  private eventHandlers: Record<string, (data: any) => void>;
  private isConnected: boolean;
  private responseText: string;
  private reconnectAttempts: number;
  private maxReconnectAttempts: number;
  private reconnectDelay: number;
  private shouldReconnect: boolean;
  private conversationHistory: Array<{role: string, content: string, timestamp: string}>;
  private isAgentSpeaking: boolean;

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
    this.ws = null;
    this.eventHandlers = {};
    this.isConnected = false;
    this.responseText = '';
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000; // Start with 1 second
    this.shouldReconnect = true;
    this.conversationHistory = [];
    this.isAgentSpeaking = false;
  }

  /**
   * Register event handler
   * @param {string} event - Event name
   * @param {(data: any) => void} handler - Event handler function
   */
  on(event: string, handler: (data: any) => void) {
    this.eventHandlers[event] = handler;
  }

  /**
   * Emit event to registered handlers
   * @param {string} event - Event name
   * @param {any} data - Event data
   */
  emit(event: string, data?: any) {
    if (this.eventHandlers[event]) {
      this.eventHandlers[event](data);
    }
  }

  /**
   * Connect to the WebSocket server
   */
  async connect() {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.serverUrl);

        this.ws.onopen = () => {
          console.log('WebSocket connected');
          this.isConnected = true;
          this.emit('connected');
          resolve();
        };

        this.ws.onmessage = (event) => {
          this.handleMessage(event.data);
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.emit('error', 'WebSocket connection error');
          reject(error);
        };

        this.ws.onclose = (event) => {
          console.log('WebSocket disconnected', event.code, event.reason);
          this.isConnected = false;
          this.emit('disconnected');

          // Attempt to reconnect if not manually disconnected
          if (this.shouldReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.attemptReconnect();
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Handle incoming WebSocket message
   * @param {string} data - Message data
   */
  handleMessage(data: string) {
    try {
      const message = JSON.parse(data);
      const eventType = message.type;

      console.log('Received event:', eventType, message);

      switch (eventType) {
        case 'session_ready':
          this.emit('session_ready');
          break;

        case 'conversation.item.input_audio_transcription.completed':
          // User's speech transcription
          const transcript = message.transcript || '';
          this.emit('transcript', transcript);
          // Store in conversation history
          if (transcript) {
            this.conversationHistory.push({
              role: 'user',
              content: transcript,
              timestamp: new Date().toISOString()
            });
          }
          break;

        case 'input_audio_buffer.speech_started':
          // User started speaking - interrupt if agent is speaking
          console.log('User started speaking');
          this.emit('user_speech_start'); // Notify AudioProcessor to stop playback
          if (this.isAgentSpeaking) {
            console.log('Interrupting agent response');
            this.interrupt();
          }
          break;

        case 'input_audio_buffer.speech_stopped':
          // User stopped speaking
          console.log('User stopped speaking');
          this.emit('user_speech_stop');
          break;

        case 'response.text.delta':
          // Accumulate response text
          const delta = message.delta || '';
          this.responseText += delta;
          console.log('Bot text delta:', delta, '| Total:', this.responseText);
          this.emit('response_text', this.responseText);
          break;

        case 'response.text.done':
          // Response text complete
          console.log('Bot text done:', this.responseText);
          this.emit('response_done', this.responseText);
          // Store in conversation history
          if (this.responseText) {
            this.conversationHistory.push({
              role: 'assistant',
              content: this.responseText,
              timestamp: new Date().toISOString()
            });
          }
          this.responseText = '';
          break;

        case 'response.audio_transcript.delta':
          // Agent's speech transcript (alternative event)
          const audioTranscriptDelta = message.delta || '';
          if (audioTranscriptDelta) {
            this.responseText += audioTranscriptDelta;
            console.log('Bot audio transcript delta:', audioTranscriptDelta);
            this.emit('response_text', this.responseText);
          }
          break;

        case 'response.audio_transcript.done':
          // Agent's speech transcript complete
          console.log('Bot audio transcript done:', this.responseText);
          if (this.responseText) {
            this.emit('response_done', this.responseText);
            this.conversationHistory.push({
              role: 'assistant',
              content: this.responseText,
              timestamp: new Date().toISOString()
            });
            this.responseText = '';
          }
          break;

        case 'response.audio.delta':
          // Audio chunk from agent
          const audioBase64 = message.delta;
          if (audioBase64) {
            console.log('Received audio chunk, size:', audioBase64.length, 'bytes');
            this.isAgentSpeaking = true;
            this.emit('audio_delta', audioBase64);
          }
          break;

        case 'response.audio.done':
          // Agent finished speaking
          this.isAgentSpeaking = false;
          this.emit('audio_done');
          break;

        case 'response.done':
          // Full response complete
          break;

        case 'input_audio_buffer.speech_started':
          // User started speaking
          this.emit('user_speech_start');
          break;

        case 'input_audio_buffer.speech_stopped':
          // User stopped speaking
          this.emit('user_speech_stop');
          break;

        case 'input_audio_buffer.committed':
          // Audio buffer committed (normal flow)
          console.log('Audio buffer committed');
          break;

        case 'conversation.item.created':
          // New conversation item created
          console.log('Conversation item created:', message.item?.id);
          break;

        case 'response.audio_transcript.delta':
          // Agent's speech transcript (if available)
          break;

        case 'session.updated':
          // Session configuration updated
          console.log('Session updated');
          break;

        case 'rate_limits.updated':
          // Rate limits updated (can be ignored)
          break;

        case 'response.content_part.done':
          // Response content part completed (can be ignored)
          break;

        case 'response.output_item.done':
          // Response output item completed (can be ignored)
          break;

        case 'conversation.item.truncated':
          // Conversation item truncated (interruption)
          console.log('Conversation item truncated');
          break;

        case 'error':
          const errorMsg = message.error?.message || 'Unknown error';
          this.emit('error', errorMsg);
          break;

        default:
          console.log('Unhandled event type:', eventType);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
      this.emit('error', 'Failed to parse server message');
    }
  }

  /**
   * Send audio data to server
   * @param {string} audioBase64 - Base64 encoded audio data
   */
  sendAudio(audioBase64: string) {
    if (this.isConnected && this.ws) {
      const message = {
        type: 'audio',
        audio: audioBase64
      };
      this.ws.send(JSON.stringify(message));
    }
  }

  /**
   * Signal end of audio input
   */
  endAudio() {
    if (this.isConnected && this.ws) {
      const message = {
        type: 'audio_end'
      };
      this.ws.send(JSON.stringify(message));
    }
  }

  /**
   * Interrupt the agent's response
   */
  interrupt() {
    if (this.isConnected && this.ws) {
      const message = {
        type: 'interrupt'
      };
      this.ws.send(JSON.stringify(message));
    }
  }

  /**
   * Attempt to reconnect to the WebSocket server
   */
  async attemptReconnect() {
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1); // Exponential backoff

    console.log(`Attempting reconnection ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms...`);
    this.emit('reconnecting', { attempt: this.reconnectAttempts, delay });

    setTimeout(async () => {
      try {
        await this.connect();
        this.reconnectAttempts = 0; // Reset on successful connection
        this.emit('reconnected');
        console.log('Successfully reconnected. Conversation history preserved.');
      } catch (error) {
        console.error('Reconnection failed:', error);
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          this.emit('reconnect_failed');
        }
      }
    }, delay);
  }

  /**
   * Get conversation history
   */
  getConversationHistory() {
    return this.conversationHistory;
  }

  /**
   * Clear conversation history
   */
  clearConversationHistory() {
    this.conversationHistory = [];
  }

  /**
   * Disconnect from the WebSocket server
   */
  disconnect() {
    this.shouldReconnect = false; // Prevent auto-reconnect
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
    }
  }
}

export default VoiceAgentClient;