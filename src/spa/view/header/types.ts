import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';

export interface IHeaderView {
  getToGarageBTN(): IElementCreator;
  getToWinnersBTN(): IElementCreator;
}

export type IHeader = IHeaderView & IView;
