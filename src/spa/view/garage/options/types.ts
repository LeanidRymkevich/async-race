import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';

export interface IOptionsView {
  getCreatingTextInput(): IElementCreator;
  getUpdatingTextInput(): IElementCreator;
  getCreatingColorInput(): IElementCreator;
  getUpdatingColorInput(): IElementCreator;
  getCreatingBTN(): IElementCreator;
  getUpdatingBTN(): IElementCreator;
  getRaceBTN(): IElementCreator;
  getResetBTN(): IElementCreator;
  getGenerateBTN(): IElementCreator;
}

export type IOptions = IOptionsView & IView;
