export interface All {
  id: number;
  serialCode: string;
  longitude: number;
  latitude: number;
  battery: number;
  sensitivity: number;
  logType: LogType;
  createdAt: string;
}

export enum LogType {
  ExternalPowerOff = 'EXTERNAL_POWER_OFF',
  ExternalPowerOn = 'EXTERNAL_POWER_ON',
  Motion = 'MOTION',
  PowerOff = 'POWER_OFF',
  PowerOn = 'POWER_ON',
  Sos = 'SOS',
}

export interface DailyLogCount {
  date: string;
  count: number;
  data: All[];
}
