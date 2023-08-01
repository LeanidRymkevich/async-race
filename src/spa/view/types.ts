import { IElementCreator } from '@src/spa/utils/elementCreator/types';

export default interface IView {
  getView(): HTMLElement;
  getViewCreator(): IElementCreator;
}
