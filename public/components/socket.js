class SocketManager {
  constructor(backendUrl) {
    this.socket = io(backendUrl);
    this.isInitialized = false;
    this.socket.on("connect", () => {
      console.log("Socket connected successfully");
    });
  }

  emitMessage(eventName, data) {
      this.socket.emit(eventName, data);
  }

  // Escuchar mensaje de manera asíncrona
  onMessage(eventName, callback) {
      this.socket.on(eventName, callback);
  }
  on(eventName, callback) {
      this.socket.on(eventName, callback);
  }
  // Desconectar el socket
  async disconnectSocket() {
      this.socket.emit("disconnect");
      this.socket.disconnect();
      this.isInitialized = false;
  }
}

export const socketurl = {
  getport() {
    const port = window.location.port || 9002;
    let socketUrl;

    if (port === '9002') {
      socketUrl = this.constructSocketUrl(9002);
    } else {
      console.log("port", port);
      socketUrl = this.constructSocketUrl(port);
    }

    return socketUrl;
  },

  constructSocketUrl(port) {
    const { protocol, hostname } = window.location;

    if (protocol === "file:") {
      console.log("protocol", protocol);
      return `http://localhost:${port}`;
    } else if (protocol === "https:") {
      console.log(`${window.location}`);
      return `${window.location}:${port}`;
    } else if (protocol === "http:") {
      return `${window.location}`;
    }
  }
};

const socketManager = new SocketManager(socketurl.getport());
Object.freeze(socketManager);
export default socketManager;
