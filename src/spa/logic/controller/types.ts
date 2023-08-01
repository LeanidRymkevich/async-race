import { orderType, sortType } from '@src/spa/logic/communicator/types';

export interface IController {
  startRendering(): Promise<void>;
}

export interface sortParams {
  _sort: sortType | undefined;
  _order: orderType | undefined;
}
