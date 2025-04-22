export interface Power {
  id: number;
  serialCode: string;
  longitude: number;
  latitude: number;
  battery: number;
  sensitivity: number;
  isOn: boolean;
  createdAt: Date;
}
