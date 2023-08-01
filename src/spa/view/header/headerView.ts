import '@src/spa/view/header/header.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import IView from '@src/spa/view/types';
import ContainerView from '@src/spa/view/container/containerView';
import { btnParams } from '@src/spa/view/button/types';
import ButtonView from '@src/spa/view/button/buttonView';
import { IHeaderView } from '@src/spa/view/header/types';

// header properties
const HEADER_TAG = 'header';
const HEADER_CLASS_NAME = 'header';
const HEADER_CONTAINER_CLASS_NAME = 'header__container';

// BTN properties
const BTN_CLASS = 'btn_primary';
const TO_GARAGE_BTN_TEXT = 'to garage';
const TO_WINNERS_BTN_TEXT = 'to winners';

export default class HeaderView extends View implements IHeaderView {
  private readonly toGarageBTN: IElementCreator;
  private readonly toWinnersBTN: IElementCreator;

  public constructor() {
    const params: ElementCreatorParams = {
      tag: HEADER_TAG,
      classNames: [HEADER_CLASS_NAME],
    };
    super(params);
    this.toGarageBTN = this.createToGarageBTN();
    this.toWinnersBTN = this.createToWinnersBTN();
    this.configureView();
  }

  public getToGarageBTN(): IElementCreator {
    return this.toGarageBTN;
  }

  public getToWinnersBTN(): IElementCreator {
    return this.toWinnersBTN;
  }

  private configureView(): void {
    const container: IView = new ContainerView();

    container.getViewCreator().setClasses([HEADER_CONTAINER_CLASS_NAME]);
    container.getViewCreator().addInnerElement(this.toGarageBTN, this.toWinnersBTN);
    this.getViewCreator().addInnerElement(container.getViewCreator());
  }

  private createToGarageBTN(): IElementCreator {
    const params: btnParams = {
      textContent: TO_GARAGE_BTN_TEXT,
      classNames: [BTN_CLASS],
    };

    return new ButtonView(params).getViewCreator();
  }

  private createToWinnersBTN(): IElementCreator {
    const params: btnParams = {
      textContent: TO_WINNERS_BTN_TEXT,
      classNames: [BTN_CLASS],
    };

    return new ButtonView(params).getViewCreator();
  }
}
