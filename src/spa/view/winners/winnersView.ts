import View from '@src/spa/view/view';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';
import ContainerView from '@src/spa/view/container/containerView';
import { IPageTitle } from '@src/spa/view/pageTitle/types';
import PageTitleView from '@src/spa/view/pageTitle/pageTitleView';
import { IPageNum } from '@src/spa/view/pageNum/types';
import PageNumView from '@src/spa/view/pageNum/pageNumView';
import { IWinnersView } from '@src/spa/view/winners/types';
import TableView from '@src/spa/view/winners/table/tableView';
import { ITable } from '@src/spa/view/winners/table/types';
import { tableRowParams } from '@src/spa/view/winners/row/tableRow/types';
import { INavigation } from '@src/spa/view/navigation/types';
import NavigationView from '@src/spa/view/navigation/navigationView';

// garage properties
const WINNERS_TAG = 'section';
const WINNERS_CLASS = 'winners';
const WINNERS_PAGE_NAME = 'Winners';

export default class WinnersView extends View implements IWinnersView {
  private readonly pageTitle: IPageTitle;
  private readonly pageNum: IPageNum;
  private readonly table: ITable;
  private readonly navigation: INavigation;

  public constructor(properties: tableRowParams[]) {
    const params: ElementCreatorParams = {
      tag: WINNERS_TAG,
      classNames: [WINNERS_CLASS],
    };
    super(params);
    this.pageTitle = new PageTitleView(WINNERS_PAGE_NAME);
    this.pageNum = new PageNumView();
    this.table = new TableView(properties);
    this.navigation = new NavigationView();
    this.configureView();
  }

  public getNavigation(): INavigation {
    return this.navigation;
  }

  public getTable(): ITable {
    return this.table;
  }

  public getPageTitle(): IPageTitle {
    return this.pageTitle;
  }

  public getPageNum(): IPageNum {
    return this.pageNum;
  }

  private configureView(): void {
    const container: IView = new ContainerView();
    // TODO add table view
    container
      .getViewCreator()
      .addInnerElement(
        this.pageTitle.getView(),
        this.pageNum.getView(),
        this.table.getView(),
        this.navigation.getView()
      );
    this.getViewCreator().addInnerElement(container.getView());
  }
}
