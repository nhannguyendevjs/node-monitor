import http from 'node:http';
import process from 'node:process';
import { GeneralConfigs } from './app.config.mjs';
import app from './app.mjs';
import { cleanUp } from './clean-up.mjs';
import { Logger } from './services/logger/logger.mjs';
import * as SocketService from './services/socket/socket.mjs';

const server = http.createServer(app);

server.once('listening', () => {
  Logger.log('info', `Server listening at http://${GeneralConfigs.HOSTNAME}:${GeneralConfigs.HOST_PORT} in ${GeneralConfigs.APP_ENV} environment`);
  // Bootstrap socket service
  SocketService.bootstrap(server);
});

server.listen({ port: GeneralConfigs.HOST_PORT, hostname: GeneralConfigs.HOSTNAME });
[('exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM')].forEach((eventType) => {
  process.on(eventType, (eventDetails) => {
    cleanUp.bind(null, eventType, eventDetails)();
  });
});
