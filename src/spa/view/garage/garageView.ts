import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import { IOptions } from '@src/spa/view/garage/options/types';
import OptionsView from '@src/spa/view/garage/options/optionsView';
import { IPageTitle } from '@src/spa/view/pageTitle/types';
import PageTitleView from '@src/spa/view/pageTitle/pageTitleView';
import { IPageNum } from '@src/spa/view/pageNum/types';
import PageNumView from '@src/spa/view/pageNum/pageNumView';
import { ITrackPage } from '@src/spa/view/garage/tracksPage/types';
import { CarParams, TrackBTNsCallbacks } from '@src/spa/view/garage/track/types';
import TracksPageView from '@src/spa/view/garage/tracksPage/tracksPageView';
import { INavigation } from '@src/spa/view/navigation/types';
import NavigationView from '@src/spa/view/navigation/navigationView';
import { IGarageView } from '@src/spa/view/garage/types';
import IView from '@src/spa/view/types';
import ContainerView from '@src/spa/view/container/containerView';

// garage properties
const GARAGE_TAG = 'section';
const GARAGE_CLASS = 'garage';
const GARAGE_PAGE_NAME = 'Garage';

export default class GarageView extends View implements IGarageView {
  private readonly options: IOptions;
  private readonly pageTitle: IPageTitle;
  private readonly pageNum: IPageNum;
  private readonly tracks: ITrackPage;
  private readonly navigation: INavigation;

  public constructor(properties: CarParams[], callbacks: TrackBTNsCallbacks) {
    const params: ElementCreatorParams = {
      tag: GARAGE_TAG,
      classNames: [GARAGE_CLASS],
    };
    super(params);
    this.options = new OptionsView();
    this.pageTitle = new PageTitleView(GARAGE_PAGE_NAME);
    this.pageNum = new PageNumView();
    this.tracks = new TracksPageView(properties, callbacks);
    this.navigation = new NavigationView();
    this.configureView();
  }

  public getOptions(): IOptions {
    return this.options;
  }

  public getPageTitle(): IPageTitle {
    return this.pageTitle;
  }

  public getPageNum(): IPageNum {
    return this.pageNum;
  }

  public getTracks(): ITrackPage {
    return this.tracks;
  }

  public getNavigation(): INavigation {
    return this.navigation;
  }

  private configureView(): void {
    const container: IView = new ContainerView();

    container
      .getViewCreator()
      .addInnerElement(
        this.options.getView(),
        this.pageTitle.getView(),
        this.pageNum.getView(),
        this.tracks.getView(),
        this.navigation.getView()
      );
    this.getViewCreator().addInnerElement(container.getView());
  }
}
