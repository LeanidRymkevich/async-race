import IView from '@src/spa/view/types';

export interface IPageTitleView {
  setItemNum(num: number): void;
  getItemsNum(): number;
}

export type IPageTitle = IPageTitleView & IView;
