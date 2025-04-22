type LogEntry = {
  hour: number;
  count: number;
};

export type DailyLog = {
  id: number;
  serialCode: string;
  longitude: number | null;
  latitude: number | null;
  battery: number | null;
  log: LogEntry[];
};
