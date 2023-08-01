import '@src/spa/view/pageTitle/pageTitle.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { IPageTitleView } from '@src/spa/view/pageTitle/types';

// title properties
const TITLE_TAG = 'h2';
const TITLE_CLASS_NAME = 'page-title';

export default class PageTitleView extends View implements IPageTitleView {
  private readonly itemsNum: IElementCreator;

  public constructor(title: string) {
    const params: ElementCreatorParams = {
      tag: TITLE_TAG,
      classNames: [TITLE_CLASS_NAME],
    };
    super(params);
    this.itemsNum = new ElementCreator({ tag: 'span' });
    this.configureView(title);
  }

  public setItemNum(num: number): void {
    this.itemsNum.setTextContent(num.toString());
  }

  public getItemsNum(): number {
    const num: string | null = this.itemsNum.getElement().textContent;
    return num ? +num : 0;
  }

  private configureView(title: string): void {
    const creator = this.getViewCreator();
    const openParenthesis: CharacterData = new Text(' (');
    const closeParenthesis: CharacterData = new Text(')');

    creator.setTextContent(title);
    creator.getElement().appendChild(openParenthesis);
    creator.getElement().append(this.itemsNum.getElement());
    creator.getElement().appendChild(closeParenthesis);
  }
}
