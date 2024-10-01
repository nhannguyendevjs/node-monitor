import { getHealthCheckData } from './helpers/os.mjs';
import { getHealthCheckTemplate } from './helpers/template.mjs';
import { showLog } from '../../utils/request/request.mjs';

const healthChecker = async (req, res, next) => {
  const template = getHealthCheckTemplate();
  const data = await getHealthCheckData();
  
  showLog(req, 200);

  res.send(template({ data: JSON.stringify(data, null, 2) }));
};

export { healthChecker };
