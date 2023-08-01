import { orderType, sortType } from '@src/spa/logic/communicator/types';
import { getItemsResult } from '@src/spa/logic/communicator/types';

export interface IWinnersCommunicator {
  getWinners(
    _page?: number,
    _limit?: number,
    _sort?: sortType,
    _order?: orderType
  ): Promise<getItemsResult<WinnerParams[]>>;
  getWinner(id: number): Promise<WinnerParams>;
  createWinner(params: CreateWinnerParams): Promise<WinnerParams>;
  updateWinner(params: CreateWinnerParams, id: number): Promise<WinnerParams>;
  deleteWinner(id: number): Promise<WinnerParams>;
}

export interface WinnerParams {
  id: number;
  wins: number;
  time: number;
}

export type CreateWinnerParams = Pick<WinnerParams, 'wins' | 'time'>;
