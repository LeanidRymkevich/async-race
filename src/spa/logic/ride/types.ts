export interface IRide {
  start(): void;
  reset(): void;
}

export interface WinEventParams {
  carId: number;
  carName: string;
  time: number;
  color: string;
}
