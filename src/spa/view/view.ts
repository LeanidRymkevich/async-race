import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';

export default abstract class View implements IView {
  private viewElementCreator: IElementCreator;
  private viewElement: HTMLElement;

  public constructor(params: ElementCreatorParams) {
    this.viewElementCreator = new ElementCreator(params);
    this.viewElement = this.viewElementCreator.getElement();
  }

  public getView(): HTMLElement {
    return this.viewElement;
  }

  public getViewCreator(): IElementCreator {
    return this.viewElementCreator;
  }
}
