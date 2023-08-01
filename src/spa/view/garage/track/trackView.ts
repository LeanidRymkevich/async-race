import '@src/spa/view/garage/track/track.scss';
import { ElementCreatorParams, IElementCreator } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import { ITrackView, CarParams, TrackBTNsCallbacks } from '@src/spa/view/garage/track/types';
import ButtonView from '@src/spa/view/button/buttonView';
import { btnParams } from '@src/spa/view/button/types';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import TrackBTNView from '@src/spa/view/garage/track/trackBTN/trackBTNView';
import { ICar } from '@src/spa/view/car/types';
import CarView from '@src/spa/view/car/carView';
import { IRide } from '@src/spa/logic/ride/types';

// button properties
const TRACK_TAG = 'div';
const TRACK_CLASS_NAME = 'track';
const TRACK_ATTRIBUTE_NAME = 'data-id';

// track header btn properties
const HEADER_BTN_CLASS_NAME = 'btn_secondary';
const SELECT_BTN_TEXT = 'select';
const REMOVE_BTN_TEXT = 'remove';

// car name element properties
const CAR_NAME_TAG = 'h4';
const CAR_NAME_CLASS = 'car-name';

// track header wrapper properties
const TRACK_HEADER_TAG = 'div';
const TRACK_HEADER_CLASS = 'track__header';

// passage btn properties
const START_BTN_TEXT = '➤';
const STOP_BTN_TEXT = '■';
const PASSAGE_BTN_WRAPPER_TAG = 'div';
const PASSAGE_BTN_WRAPPER_CLASS = 'passage-buttons';

// passage wrapper properties
const PASSAGE_WRAPPER_TAG = 'div';
const PASSAGE_WRAPPER_CLASS = 'passage-wrapper';

// passage properties
const PASSAGE_TAG = 'div';
const PASSAGE_CLASS = 'passage';

// flag properties
const FLAG_TAG = 'span';
const FLAG_CLASS = 'flag';

export default class TrackView extends View implements ITrackView {
  private readonly selectBTN: IElementCreator;
  private readonly removeBTN: IElementCreator;
  private readonly carName: IElementCreator;
  private readonly startBTN: IElementCreator;
  private readonly stopBTN: IElementCreator;
  private readonly flag: IElementCreator;
  private readonly passage: IElementCreator;
  private readonly id: number;
  private readonly car: ICar;
  private selectBTNCallback: EventListenerOrEventListenerObject;
  private removeBTNCallback: EventListenerOrEventListenerObject;
  private startBTNCallback: EventListenerOrEventListenerObject;
  private stopBTNCallback: EventListenerOrEventListenerObject;
  private ride: IRide | null = null;

  public constructor(properties: CarParams, callbacks: TrackBTNsCallbacks) {
    const params: ElementCreatorParams = {
      tag: TRACK_TAG,
      classNames: [TRACK_CLASS_NAME],
      attributes: { [TRACK_ATTRIBUTE_NAME]: properties.id.toString() },
    };
    super(params);
    this.id = properties.id;
    this.selectBTN = this.createSelectBTN();
    this.removeBTN = this.createRemoveBTN();
    this.carName = new ElementCreator({ tag: CAR_NAME_TAG });
    this.startBTN = new TrackBTNView(START_BTN_TEXT).getViewCreator();
    this.stopBTN = new TrackBTNView(STOP_BTN_TEXT).getViewCreator();
    this.car = new CarView(properties.color);
    this.passage = this.createPassageElement();
    this.flag = this.createFlag();
    this.configureView(properties.color, properties.name);
    this.selectBTNCallback = () => callbacks.selectBTNCallback(this);
    this.removeBTNCallback = () => callbacks.removeBTNCallback(this);
    this.startBTNCallback = () => callbacks.startBTNCallback(this);
    this.stopBTNCallback = () => callbacks.stopBTNCallback(this);
    this.setBTNsCallbacks();
  }

  public getID(): number {
    return this.id;
  }

  public getSelectBTN(): IElementCreator {
    return this.selectBTN;
  }

  public getRemoveBTN(): IElementCreator {
    return this.removeBTN;
  }

  public getCarName(): IElementCreator {
    return this.carName;
  }

  public getStartBTN(): IElementCreator {
    return this.startBTN;
  }

  public getStopBTN(): IElementCreator {
    return this.stopBTN;
  }

  public getFlag(): IElementCreator {
    return this.flag;
  }

  public getPassage(): IElementCreator {
    return this.passage;
  }

  public getCar(): ICar {
    return this.car;
  }

  public setRideObj(ride: IRide): IRide {
    this.ride = ride;
    return this.ride;
  }

  public getRideObj(): IRide | null {
    return this.ride;
  }

  private configureView(carColor: string, carName: string): void {
    const trackHeader: IElementCreator = this.createTrackHeader(carName);
    const trackPassage: IElementCreator = this.createPassageWrapper();
    this.getViewCreator().addInnerElement(trackHeader, trackPassage);
  }

  private createPassageWrapper(): IElementCreator {
    const wrapperParams: ElementCreatorParams = {
      tag: PASSAGE_WRAPPER_TAG,
      classNames: [PASSAGE_WRAPPER_CLASS],
    };
    const wrapper: IElementCreator = new ElementCreator(wrapperParams);
    const passageBTNWrapper: IElementCreator = this.createPassageBTNWrapper();

    this.configurePassage();
    wrapper.addInnerElement(passageBTNWrapper, this.passage);
    return wrapper;
  }

  private setBTNsCallbacks(): void {
    this.selectBTN.setListeners([{ event: 'click', callback: this.selectBTNCallback }]);
    this.removeBTN.setListeners([{ event: 'click', callback: this.removeBTNCallback }]);
    this.startBTN.setListeners([{ event: 'click', callback: this.startBTNCallback }]);
    this.stopBTN.setListeners([{ event: 'click', callback: this.stopBTNCallback }]);
  }

  private configurePassage(): void {
    this.passage.addInnerElement(this.car.getViewCreator(), this.flag);
  }

  private createFlag(): IElementCreator {
    const flagParams: ElementCreatorParams = {
      tag: FLAG_TAG,
      classNames: [FLAG_CLASS],
    };
    const flag: IElementCreator = new ElementCreator(flagParams);
    return flag;
  }

  private createPassageElement(): IElementCreator {
    const passageParams: ElementCreatorParams = {
      tag: PASSAGE_TAG,
      classNames: [PASSAGE_CLASS],
    };
    const passage: IElementCreator = new ElementCreator(passageParams);
    return passage;
  }

  private createPassageBTNWrapper(): IElementCreator {
    const wrapperParams: ElementCreatorParams = {
      tag: PASSAGE_BTN_WRAPPER_TAG,
      classNames: [PASSAGE_BTN_WRAPPER_CLASS],
    };
    const wrapper: IElementCreator = new ElementCreator(wrapperParams);

    this.stopBTN.setAttributes({ disabled: '' });
    wrapper.addInnerElement(this.startBTN, this.stopBTN);
    return wrapper;
  }

  private createTrackHeader(carName: string): IElementCreator {
    const trackHeaderParams: ElementCreatorParams = {
      tag: TRACK_HEADER_TAG,
      classNames: [TRACK_HEADER_CLASS],
    };
    const trackHeader: IElementCreator = new ElementCreator(trackHeaderParams);

    this.carName.setClasses([CAR_NAME_CLASS]);
    this.carName.setTextContent(carName);
    trackHeader.addInnerElement(this.selectBTN, this.removeBTN, this.carName);

    return trackHeader;
  }

  private createSelectBTN(): IElementCreator {
    const params: btnParams = {
      textContent: SELECT_BTN_TEXT,
      classNames: [HEADER_BTN_CLASS_NAME],
    };
    return new ButtonView(params).getViewCreator();
  }

  private createRemoveBTN(): IElementCreator {
    const params: btnParams = {
      textContent: REMOVE_BTN_TEXT,
      classNames: [HEADER_BTN_CLASS_NAME],
    };
    return new ButtonView(params).getViewCreator();
  }
}
