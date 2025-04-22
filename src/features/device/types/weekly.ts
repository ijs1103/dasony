type LogEntry = {
  month: string;
  count: number;
};

export type WeeklyLog = {
  id: number;
  serialCode: string;
  longitude: number | null;
  latitude: number | null;
  battery: number | null;
  log: LogEntry[];
};
