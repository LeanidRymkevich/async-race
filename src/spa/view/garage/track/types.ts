import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import IView from '@src/spa/view/types';
import { ICar } from '@src/spa/view/car/types';
import { IRide } from '@src/spa/logic/ride/types';

export interface CarParams {
  id: number;
  name: string;
  color: string;
}

export interface ITrackView {
  getSelectBTN(): IElementCreator;
  getRemoveBTN(): IElementCreator;
  getCarName(): IElementCreator;
  getStartBTN(): IElementCreator;
  getStopBTN(): IElementCreator;
  getFlag(): IElementCreator;
  getPassage(): IElementCreator;
  getCar(): ICar;
  getID(): number;
  setRideObj(ride: IRide): IRide;
  getRideObj(): IRide | null;
}

export interface TrackBTNsCallbacks {
  selectBTNCallback: TrackBTNCallback;
  removeBTNCallback: TrackBTNCallback;
  startBTNCallback: TrackBTNCallback;
  stopBTNCallback: TrackBTNCallback;
}

export type ITrack = ITrackView & IView;

export type TrackBTNCallback = (track: ITrack) => void;
