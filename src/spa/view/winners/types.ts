import { IPageTitle } from '@src/spa/view/pageTitle/types';
import { IPageNum } from '@src/spa/view/pageNum/types';
import IView from '@src/spa/view/types';
import { ITable } from '@src/spa/view/winners/table/types';
import { INavigation } from '@src/spa/view/navigation/types';

export interface IWinnersView {
  getPageTitle(): IPageTitle;
  getPageNum(): IPageNum;
  getTable(): ITable;
  getNavigation(): INavigation;
}

export type IWinners = IWinnersView & IView;
