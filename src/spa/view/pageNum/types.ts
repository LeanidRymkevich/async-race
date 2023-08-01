import IView from '@src/spa/view/types';

export interface IPageNumView {
  setItemNum(num: number): void;
}

export type IPageNum = IPageNumView & IView;
