import '@src/spa/view/winners/row/tableRow/tableRow.scss';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import { ITableRowView, tableRowParams } from '@src/spa/view/winners/row/tableRow/types';
import { ICar } from '@src/spa/view/car/types';
import RowView from '@src/spa/view/winners/row/rowView';
import CarView from '@src/spa/view/car/carView';

// id attribute for row
const ROW_ATTRIBUTE_NAME = 'data-id';

// table cell properties
const CELL_TAG = 'td';
const CELL_CLASS = 'table__cell';

// class for small car presentation
const SMALL_CAR_CLASS = 'car_small';

export default class TableRowView extends RowView implements ITableRowView {
  private readonly id: number;
  private readonly car: ICar;
  private readonly rowNumCell: IElementCreator;
  private readonly carNameCell: IElementCreator;
  private readonly winsCell: IElementCreator;
  private readonly timeCell: IElementCreator;

  public constructor(properties: tableRowParams) {
    super();
    this.id = properties.id;
    this.rowNumCell = this.getCell(properties.rowNum, CELL_TAG, CELL_CLASS);
    this.car = new CarView(properties.color);
    this.carNameCell = this.getCell(properties.carName, CELL_TAG, CELL_CLASS);
    this.winsCell = this.getCell(properties.wins, CELL_TAG, CELL_CLASS);
    this.timeCell = this.getCell(properties.time, CELL_TAG, CELL_CLASS);
    this.configureView();
  }

  public getRowId(): number {
    return this.id;
  }

  public getRowCar(): ICar {
    return this.car;
  }

  public updateRowNum(num: number): void {
    this.rowNumCell.setTextContent(num.toString());
  }

  public updateCarName(name: string): void {
    this.carNameCell.setTextContent(name);
  }

  public updateWins(wins: number): void {
    this.winsCell.setTextContent(wins.toString());
  }

  public updateTime(time: number): void {
    this.timeCell.setTextContent(time.toString());
  }

  private configureView(): void {
    const carCell: IElementCreator = this.getCell(this.car, CELL_TAG, CELL_CLASS);

    this.car.getViewCreator().setClasses([SMALL_CAR_CLASS]);
    this.addCell(this.rowNumCell, carCell, this.carNameCell, this.winsCell, this.timeCell);
    this.getViewCreator().setAttributes({ [ROW_ATTRIBUTE_NAME]: this.id.toString() });
  }
}
