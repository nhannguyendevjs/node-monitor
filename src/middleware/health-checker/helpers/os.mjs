import * as si from 'systeminformation';

const getHealthCheckData = async () => {
  const osInfo = await si.osInfo();
  const cpuUsage = 0;
  const memoryUsage = 0;

  return { osInfo, cpuUsage, memoryUsage };
};

export { getHealthCheckData };
