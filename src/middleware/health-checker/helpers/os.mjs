import * as si from 'systeminformation';

const getHealthCheckData = async () => {
  const osInfo = await si.osInfo();
  // const system = await si.system();
  // const cpu = await si.cpu();
  // const cpuCurrentSpeed = await si.cpuCurrentSpeed();
  // const cpuTemperature = await si.cpuTemperature();
  // const mem = await si.mem();
  // const memLayout = await si.memLayout();
  // const diskLayout = await si.diskLayout();
  // const networkStats = await si.networkStats();
  return { osInfo /**, system , cpu, cpuCurrentSpeed, cpuTemperature, mem, memLayout, diskLayout, networkStats**/ };
};

export { getHealthCheckData };
