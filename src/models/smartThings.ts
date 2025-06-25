import axios from 'axios';
import Config from '../config/env';

type Command = {
  component: string;
  capability: string;
  command: string;
};

const SmartThingsApi = axios.create({
  baseURL: Config.smartThingsApiUrl,
  headers: {
    Authorization: `Bearer ${Config.smartThingsApiKey}`,
  },
});

export type SmartThingsDevice = {
  deviceId: string;
  label: string;
};

const update = async (deviceId: string, commands: Command[]) => {
  const { data } = await SmartThingsApi.post(`devices/${deviceId}/status`, {
    commands,
  });

  return data;
};

const devices = async (): Promise<SmartThingsDevice[]> => {
  const { data } = await SmartThingsApi.get('devices');

  return data;
};

const device = async (deviceId: string): Promise<SmartThingsDevice> => {
  const { data } = await SmartThingsApi.get(`devices/${deviceId}`);

  return data;
};

const SmartThings = {
  devices,
  device,
  update,
};

export default SmartThings;
