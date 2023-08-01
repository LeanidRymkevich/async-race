import { orderType } from '@src/spa/logic/communicator/types';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';

export interface ITableHeaderView {
  getWinsCell(): IElementCreator;
  getTimeCell(): IElementCreator;
  setWinsCellModifier(type?: orderType): void;
  setTimeCellModifier(type?: orderType): void;
}

export type ITableHeader = ITableHeaderView & IView;

export enum TABLE_HEADER_TEXT {
  NUMBER = 'Number',
  CAR = 'Car',
  NAME = 'Name',
  WINS = 'Wins',
  TIME = 'Best time (seconds)',
}
