export interface MonthlyRawData {
  month: string;
  count: number;
}

export type MonthlyLog = {
  id: number;
  serialCode: string;
  longitude: number | null;
  latitude: number | null;
  battery: number | null;
  log: MonthlyRawData[];
};
