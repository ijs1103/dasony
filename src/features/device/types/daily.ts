export interface DailyRawData {
  hour: number;
  count: number;
}

export interface DailyLog {
  id: number;
  serialCode: string;
  longitude: number | null;
  latitude: number | null;
  battery: number | null;
  log: DailyRawData[];
}
