import {
  CreateWinnerParams,
  IWinnersCommunicator,
  WinnerParams,
} from '@src/spa/logic/communicator/winnersCommunicator/types';
import Communicator from '@src/spa/logic/communicator/communicator';
import { PATHS, QUERY_TAGS, QueryParams, getItemsResult, orderType, sortType } from '@src/spa/logic/communicator/types';

export default class WinnersCommunicator extends Communicator implements IWinnersCommunicator {
  private static readonly instance: IWinnersCommunicator = new WinnersCommunicator();
  public static readonly PAGE_LIMIT = 10;

  private readonly winnersUrl: PATHS = PATHS.WINNERS;

  private constructor() {
    super();
  }

  public static getInstance(): IWinnersCommunicator {
    return this.instance;
  }

  public async getWinners(
    _page?: number,
    _limit?: number,
    _sort?: sortType,
    _order?: orderType
  ): Promise<getItemsResult<WinnerParams[]>> {
    const queryParams: QueryParams = {};
    if (_page !== undefined) queryParams[QUERY_TAGS.PAGE] = _page;
    if (_limit !== undefined) queryParams[QUERY_TAGS.LIMIT] = _limit;
    if (_sort !== undefined) queryParams[QUERY_TAGS.SORT] = _sort;
    if (_order !== undefined) queryParams[QUERY_TAGS.ORDER] = _order;

    return await this.getItems(this.winnersUrl, queryParams);
  }

  public async getWinner(id: number): Promise<WinnerParams> {
    return await this.getItem(this.winnersUrl, id);
  }

  public async createWinner(params: CreateWinnerParams): Promise<WinnerParams> {
    return await this.createItem(this.winnersUrl, params);
  }

  public async updateWinner(params: CreateWinnerParams, id: number): Promise<WinnerParams> {
    return await this.updateItem(this.winnersUrl, params, id);
  }

  public async deleteWinner(id: number): Promise<WinnerParams> {
    return await this.deleteItem(this.winnersUrl, id);
  }
}
