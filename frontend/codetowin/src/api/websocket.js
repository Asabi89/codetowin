const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';

export class ChatWebSocket {
  constructor(conversationId, onMessageCallback) {
    this.conversationId = conversationId;
    this.onMessageCallback = onMessageCallback;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.ws = new WebSocket(`${WS_BASE_URL}/chat/${this.conversationId}/?token=${token}`);

    this.ws.onopen = () => {
      console.log('WebSocket Connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (this.onMessageCallback) {
        this.onMessageCallback(data);
      }
    };

    this.ws.onclose = (event) => {
      console.log('WebSocket Disconnected', event);
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++;
          this.connect();
        }, 2000 * this.reconnectAttempts);
      }
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  }

  sendMessage(content) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ content }));
    } else {
      console.error('WebSocket is not open. State:', this.ws?.readyState);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
