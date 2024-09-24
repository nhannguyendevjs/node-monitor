import { getHealthCheckData } from './helpers/os.mjs';
import { getHealthCheckTemplate } from './helpers/template.mjs';
// import { initSocket, destroySocket } from './helpers/socket.mjs';

const healthChecker = async (req, res, next) => {
  const template = getHealthCheckTemplate();
  const data = await getHealthCheckData();
  res.send(template({ data: JSON.stringify(data, null, 2) }));
};

export { healthChecker };

