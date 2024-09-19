const { Server } = require('socket.io');

class SocketManager {
  constructor(server) {
    // Crear instancia de Socket.IO
    this.io = new Server(server, {
      cors: {
        origin: "*", // Permitir conexiones de cualquier origen
        methods: ["GET", "POST"]
      }
    });

    // Mapa para registrar los sockets
    this.socketsMap = new Map();

    // Inicializar la escucha de conexiones
    this.io.on('connection', (socket) => this.handleConnection(socket));
  }
  on(event, callback) {
    this.io.on(event, callback);
  }
  // Manejar nuevas conexiones
  handleConnection(socket) {
    console.log(`Nuevo socket conectado: ${socket.id}`);

    // Añadir socket al mapa
    this.socketsMap.set(socket.id, socket);

    // Escuchar eventos de mensajes
    socket.on('message', (msg) => {
      console.log(`Mensaje recibido de ${socket.id}: ${msg}`);
      this.emitToAll(`Echo: ${msg}`); // Ejemplo de emitir el mensaje a todos
    });

    // Escuchar desconexiones
    socket.on('disconnect', () => {
      console.log(`Socket desconectado: ${socket.id}`);
      this.socketsMap.delete(socket.id); // Eliminar el socket del mapa al desconectarse
    });
  }

  // Emitir un mensaje a un socket específico
  emitToSocket(socketId, event, message) {
    const socket = this.socketsMap.get(socketId);
    if (socket) {
      socket.emit(event, message);
    } else {
      console.error(`Socket con ID ${socketId} no encontrado.`);
    }
  }

  // Emitir un mensaje a todos los sockets conectados
  emitToAll(message) {
    for (const [socketId, socket] of this.socketsMap.entries()) {
      socket.emit('message', message);
    }
  }

  // Emitir un evento personalizado a todos los sockets
  emitEventToAll(event, message) {
    for (const [socketId, socket] of this.socketsMap.entries()) {
      socket.emit(event, message);
    }
  }

  // Obtener la cantidad de sockets conectados
  getSocketCount() {
    return this.socketsMap.size;
  }

  // Emitir solo a los primeros N sockets conectados
  emitToFirstNSockets(n, event, message) {
    let count = 0;
    for (const [socketId, socket] of this.socketsMap.entries()) {
      socket.emit(event, message);
      count++;
      if (count >= n) break;
    }
  }
}

module.exports = SocketManager;
