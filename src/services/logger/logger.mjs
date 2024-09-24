import { createLogger, format, transports } from 'winston';
import { LoggerConfigs } from '../../app.config.mjs';

const Logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      silent: !LoggerConfigs.ENABLE_LOGGER_CONSOLE,
    }),
  ],
});

const bootstrap = async () => {
  Logger.log('info', `Logger is ready to use`);
};

export { bootstrap, Logger };

