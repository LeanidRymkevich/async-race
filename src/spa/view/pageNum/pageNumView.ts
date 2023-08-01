import '@src/spa/view/pageNum/pageNum.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { IPageNumView } from '@src/spa/view/pageNum/types';

// button properties
const TITLE_TAG = 'h3';
const TITLE_CLASS_NAME = 'page-num';
const TITLE_CLASS_TEXT = 'Page';

export default class PageNumView extends View implements IPageNumView {
  private readonly itemsNum: IElementCreator;
  public constructor() {
    const params: ElementCreatorParams = {
      tag: TITLE_TAG,
      classNames: [TITLE_CLASS_NAME],
    };
    super(params);
    this.itemsNum = new ElementCreator({ tag: 'span' });
    this.configureView();
  }

  public setItemNum(num: number): void {
    this.itemsNum.setTextContent(num.toString());
  }

  private configureView(): void {
    const creator = this.getViewCreator();
    const hash: CharacterData = new Text(' #');

    creator.setTextContent(TITLE_CLASS_TEXT);
    creator.getElement().appendChild(hash);
    creator.getElement().append(this.itemsNum.getElement());
  }
}
