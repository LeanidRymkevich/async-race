import '@src/spa/view/navigation/navigation.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import ButtonView from '@src/spa/view/button/buttonView';
import { btnParams } from '@src/spa/view/button/types';
import { INavigationView } from '@src/spa/view/navigation/types';

// page navigation buttons wrapper properties
const NAVIGATION_TAG = 'div';
const NAVIGATION_CLASS = 'navigation';

// page navigation buttons properties
const BTN_CLASS = 'btn_primary';
const NEXT_BTN_TEXT = 'next';
const PREV_BTN_TEXT = 'prev';

export default class NavigationView extends View implements INavigationView {
  private readonly nextPageBTN: IElementCreator;
  private readonly prevPageBTN: IElementCreator;

  public constructor() {
    const params: ElementCreatorParams = {
      tag: NAVIGATION_TAG,
      classNames: [NAVIGATION_CLASS],
    };
    super(params);
    this.nextPageBTN = this.createNavigationBTN(NEXT_BTN_TEXT, BTN_CLASS);
    this.prevPageBTN = this.createNavigationBTN(PREV_BTN_TEXT, BTN_CLASS);
    this.configureView();
  }

  public getNextPageBTN(): IElementCreator {
    return this.nextPageBTN;
  }

  public getPrevPageBTN(): IElementCreator {
    return this.prevPageBTN;
  }

  private configureView() {
    this.nextPageBTN.setAttributes({ disabled: '' });
    this.prevPageBTN.setAttributes({ disabled: '' });
    this.getViewCreator().addInnerElement(this.nextPageBTN, this.prevPageBTN);
  }

  private createNavigationBTN(text: string, ...classes: string[]): IElementCreator {
    const params: btnParams = {
      textContent: text,
      classNames: classes,
    };

    return new ButtonView(params).getViewCreator();
  }
}
