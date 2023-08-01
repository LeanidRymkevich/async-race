import '@src/spa/view/winners/row/tableHeader/tableHeader.scss';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import { ITableHeaderView, TABLE_HEADER_TEXT } from '@src/spa/view/winners/row/tableHeader/types';
import RowView from '@src/spa/view/winners/row/rowView';
import { orderType } from '@src/spa/logic/communicator/types';

// table cell properties
const CELL_TAG = 'th';
const CELL_CLASS = 'table__header-cell';

// ascending and descending, clickable classes
const ASC_CLASS = '_asc';
const DSC_CLASS = '_dsc';
const CLICKABLE_CLASS = '_clickable';

export default class TableHeaderView extends RowView implements ITableHeaderView {
  private readonly winsCell: IElementCreator;
  private readonly timeCell: IElementCreator;

  public constructor() {
    super();
    this.winsCell = this.getCell(TABLE_HEADER_TEXT.WINS, CELL_TAG, CELL_CLASS);
    this.timeCell = this.getCell(TABLE_HEADER_TEXT.TIME, CELL_TAG, CELL_CLASS);
    this.configureView();
  }

  public setWinsCellModifier(type?: orderType): void {
    if (type === orderType.ASC) {
      this.winsCell.removeClasses(DSC_CLASS);
      this.winsCell.setClasses([ASC_CLASS]);
    } else if (type === orderType.DESC) {
      this.winsCell.removeClasses(ASC_CLASS);
      this.winsCell.setClasses([DSC_CLASS]);
    } else if (!type) {
      this.winsCell.removeClasses(ASC_CLASS, DSC_CLASS);
    }
  }

  public setTimeCellModifier(type?: orderType): void {
    if (type === orderType.ASC) {
      this.timeCell.removeClasses(DSC_CLASS);
      this.timeCell.setClasses([ASC_CLASS]);
    } else if (type === orderType.DESC) {
      this.timeCell.removeClasses(ASC_CLASS);
      this.timeCell.setClasses([DSC_CLASS]);
    } else if (!type) {
      this.timeCell.removeClasses(ASC_CLASS, DSC_CLASS);
    }
  }

  public getWinsCell(): IElementCreator {
    return this.winsCell;
  }

  public getTimeCell(): IElementCreator {
    return this.timeCell;
  }

  private configureView(): void {
    const numCell: IElementCreator = this.getCell(TABLE_HEADER_TEXT.NUMBER, CELL_TAG, CELL_CLASS);
    const carCell: IElementCreator = this.getCell(TABLE_HEADER_TEXT.CAR, CELL_TAG, CELL_CLASS);
    const nameCell: IElementCreator = this.getCell(TABLE_HEADER_TEXT.NAME, CELL_TAG, CELL_CLASS);

    this.winsCell.setClasses([CLICKABLE_CLASS]);
    this.timeCell.setClasses([CLICKABLE_CLASS]);
    this.addCell(numCell, carCell, nameCell, this.winsCell, this.timeCell);
  }
}
