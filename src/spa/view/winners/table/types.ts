import IView from '@src/spa/view/types';
import { ITableRow, tableRowParams } from '@src/spa/view/winners/row/tableRow/types';
import { ITableHeader } from '@src/spa/view/winners/row/tableHeader/types';

export interface ITableView {
  addRowsToTable(...properties: tableRowParams[]): void;
  removeRowFromTable(id: number): boolean;
  getRowFromPage(id: number): ITableRow | null;
  getHeader(): ITableHeader;
  getRowsNum(): number;
  addRowToTable(property: tableRowParams): void;
}

export type ITable = ITableView & IView;
