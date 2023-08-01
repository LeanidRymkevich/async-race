import '@src/spa/view/winners/table/table.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import { ITableRow, tableRowParams } from '@src/spa/view/winners/row/tableRow/types';
import { ITableHeader } from '@src/spa/view/winners/row/tableHeader/types';
import { ITableView } from '@src/spa/view/winners/table/types';
import TableHeaderView from '@src/spa/view/winners/row/tableHeader/tableHeaderView';
import TableRowView from '@src/spa/view/winners/row/tableRow/tableRowView';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';

// table properties
const TABLE_TAG = 'table';
const TABLE_CLASS = 'table';

// table body properties
const TABLE_BODY_TAG = 'tbody';
const TABLE_BODY_CLASS = 'table__body';

// table head properties
const TABLE_HEAD_TAG = 'thead';
const TABLE_HEAD_CLASS = 'table__header';

export default class TableView extends View implements ITableView {
  private readonly rows: Map<number, ITableRow> = new Map();
  private readonly header: ITableHeader;
  private readonly body: IElementCreator;

  public constructor(properties: tableRowParams[]) {
    const params: ElementCreatorParams = {
      tag: TABLE_TAG,
      classNames: [TABLE_CLASS],
    };
    super(params);
    this.header = new TableHeaderView();
    this.body = this.createTableBody();
    this.configureView();
    this.addRowsToTable(...properties);
  }

  public getRowsNum(): number {
    return this.rows.size;
  }

  public getHeader(): ITableHeader {
    return this.header;
  }

  public addRowsToTable(...properties: tableRowParams[]): void {
    this.body.getElement().innerHTML = '';
    properties.forEach((property: tableRowParams): void => {
      const row: ITableRow = new TableRowView(property);
      this.rows.set(property.id, row);
      this.body.addInnerElement(row.getViewCreator());
    });
  }

  public addRowToTable(property: tableRowParams): void {
    const row: ITableRow = new TableRowView(property);
    this.rows.set(property.id, row);
    this.body.addInnerElement(row.getViewCreator());
  }

  public removeRowFromTable(id: number): boolean {
    const row: ITableRow | undefined = this.rows.get(id);

    if (!row) return false;

    this.rows.delete(id);
    row.getView().remove();
    return true;
  }

  public getRowFromPage(id: number): ITableRow | null {
    const row: ITableRow | undefined = this.rows.get(id);

    if (!row) return null;
    return row;
  }

  private configureView() {
    const head: IElementCreator = this.createTableHead();

    head.addInnerElement(this.header.getViewCreator());
    this.getViewCreator().addInnerElement(head, this.body);
  }

  private createTableBody(): IElementCreator {
    const bodyParams: ElementCreatorParams = {
      tag: TABLE_BODY_TAG,
      classNames: [TABLE_BODY_CLASS],
    };
    const body: IElementCreator = new ElementCreator(bodyParams);
    return body;
  }

  private createTableHead(): IElementCreator {
    const headParams: ElementCreatorParams = {
      tag: TABLE_HEAD_TAG,
      classNames: [TABLE_HEAD_CLASS],
    };
    const head: IElementCreator = new ElementCreator(headParams);
    return head;
  }
}
