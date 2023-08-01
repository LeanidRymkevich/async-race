import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import { cellContent } from '@src/spa/view/winners/row/types';
import CarView from '@src/spa/view/car/carView';

// table row properties
const TABLE_ROW_TAG = 'tr';
const TABLE_ROW_CLASS = 'table__row';

// span element properties
const SPAN_TAG = 'span';

export default abstract class RowView extends View {
  public constructor() {
    const params: ElementCreatorParams = {
      tag: TABLE_ROW_TAG,
      classNames: [TABLE_ROW_CLASS],
    };
    super(params);
    // this.configureView();
  }

  protected addCell(...cell: IElementCreator[]): void {
    this.getViewCreator().addInnerElement(...cell);
  }

  protected getCell(content: cellContent, tag: string, ...classes: string[]): IElementCreator {
    const cellParams: ElementCreatorParams = {
      tag: tag,
      classNames: classes,
    };
    const cell: IElementCreator = new ElementCreator(cellParams);

    if (typeof content === 'string') {
      cell.addInnerElement(this.createSpanElement(content));
    } else if (typeof content === 'number') {
      cell.addInnerElement(this.createSpanElement(content.toString()));
    } else if (content instanceof CarView) {
      cell.addInnerElement(content.getViewCreator());
      return cell;
    }
    return cell;
  }

  private createSpanElement(content: string): IElementCreator {
    const spanParams: ElementCreatorParams = {
      tag: SPAN_TAG,
      textContent: content,
    };
    const span: IElementCreator = new ElementCreator(spanParams);
    return span;
  }
}
