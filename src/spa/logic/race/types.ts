import { WinEventParams } from '@src/spa/logic/ride/types';

export interface IRace {
  start(): void;
  reset(): void;
  onWinsHandler(callback: OnWinCallback): void;
}

export type OnWinCallback = (winner: WinEventParams) => void;
