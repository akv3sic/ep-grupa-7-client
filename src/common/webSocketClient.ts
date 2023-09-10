/**
 * Defines the options that can be passed to the `createWebSocketClient` function to handle various WebSocket events.
 *
 * @property onOpen - Optional callback to be called when the WebSocket connection is opened.
 * @property onClose - Optional callback to be called when the WebSocket connection is closed.
 * @property onMessage - Optional callback to be called when a message is received from the WebSocket server.
 * @property onError - Optional callback to be called when there is an error with the WebSocket connection.
 */
type WebSocketClientOptions = {
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onMessage?: (message: MessageEvent) => void;
  onError?: (event: Event) => void;
};

/**
 * Creates a WebSocket client that connects to a specified endpoint and provides hooks to handle different WebSocket events.
 *
 * @param endpoint - The endpoint URL segment to which the WebSocket should connect.
 * @param options - Optional object to define callback functions for various WebSocket events.
 *
 * @returns An object with `send` and `close` functions to interact with the WebSocket.
 */
function createWebSocketClient(endpoint: string, options?: WebSocketClientOptions) {
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

export default createWebSocketClient;
