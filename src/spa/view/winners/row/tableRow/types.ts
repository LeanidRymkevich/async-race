import IView from '@src/spa/view/types';
import { ICar } from '@src/spa/view/car/types';

export interface ITableRowView {
  getRowId(): number;
  getRowCar(): ICar;
  updateRowNum(num: number): void;
  updateCarName(name: string): void;
  updateWins(wins: number): void;
  updateTime(time: number): void;
}

export interface tableRowParams {
  id: number;
  rowNum: number;
  color: string;
  carName: string;
  wins: number;
  time: number;
}

export type ITableRow = ITableRowView & IView;
