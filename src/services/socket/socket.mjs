import { Logger } from '../logger/logger.mjs';
import { Server } from 'socket.io';

const socket = new Map();

const initSocket = (server) => {
  const io = new Server(server);

  socket.set('io', io);

  io.on('connection', (socket) => {
    Logger.log('info', `Socket connected: ${socket.id}`);

    socket.on('disconnect', () => {
      Logger.log('info', `Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

const emit = (event, message) => {
  socket.get('io').emit(event, message);
}

const bootstrap = async (server) => {
  initSocket(server);
  Logger.log('info', `Socket is ready to use`);
};

export { bootstrap, initSocket, emit, socket };
