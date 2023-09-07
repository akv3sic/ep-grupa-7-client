type WebSocketClientOptions = {
    onOpen?: (event: Event) => void;
    onClose?: (event: CloseEvent) => void;
    onMessage?: (message: MessageEvent) => void;
    onError?: (event: Event) => void;
  };
  
  export default function createWebSocketClient(endpoint: string, options?: WebSocketClientOptions) {
    const baseUrl = import.meta.env.VITE_WEBSOCKET_BASE_URL as string;
    const socket = new WebSocket(`${baseUrl}${endpoint}`);
  
    socket.onopen = (event) => {
      options?.onOpen?.(event);
      console.log('WebSocket is open now.');
    };
  
    socket.onclose = (event) => {
      options?.onClose?.(event);
      console.log('WebSocket is closed now.');
    };
  
    socket.onmessage = (message) => {
      options?.onMessage?.(message);
      console.log('WebSocket message received:', message);
    };
  
    socket.onerror = (event) => {
      options?.onError?.(event);
      console.error('WebSocket error observed:', event);
    };
  
    const send = (message: string) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      } else {
        console.error('WebSocket is not open');
      }
    };
  
    const close = () => {
      socket.close();
    };
  
    return {
      send,
      close,
    };
  }
  