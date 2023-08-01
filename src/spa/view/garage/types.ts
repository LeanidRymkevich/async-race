import IView from '@src/spa/view/types';
import { INavigation } from '@src/spa/view/navigation/types';
import { ITrackPage } from '@src/spa/view/garage/tracksPage/types';
import { IPageTitle } from '@src/spa/view/pageTitle/types';
import { IPageNum } from '@src/spa/view/pageNum/types';
import { IOptions } from '@src/spa/view/garage/options/types';

export interface IGarageView {
  getOptions(): IOptions;
  getPageTitle(): IPageTitle;
  getPageNum(): IPageNum;
  getTracks(): ITrackPage;
  getNavigation(): INavigation;
}

export type IGarage = IGarageView & IView;
