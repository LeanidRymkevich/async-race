import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';

export interface INavigationView {
  getNextPageBTN(): IElementCreator;
  getPrevPageBTN(): IElementCreator;
}

export type INavigation = INavigationView & IView;
