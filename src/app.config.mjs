export const GeneralConfigs = {
  HOST_ENV: process.env.HOST_ENV,
  HOSTNAME: process.env.HOSTNAME,
  HOST_PORT: process.env.HOST_PORT,
  APP_DOMAIN: process.env.APP_DOMAIN,
  APP_VERSION: process.env.APP_VERSION,
  API_VERSION: process.env.API_VERSION,
  APP_ENV: process.env.APP_ENV,
};

export const RequestConfigs = {
  ENABLE_REQUEST: process.env.ENABLE_REQUEST,
  REQUEST_TIMEOUT: process.env.REQUEST_TIMEOUT,
};

export const LoggerConfigs = {
  ENABLE_LOGGER_CONSOLE: process.env.ENABLE_LOGGER_CONSOLE,
};

export const bootstrap = async () => {
  console.log(`{"level":"info","message":"App Config is ready to use","timestamp":"${new Date().toISOString()}"}`);
};
