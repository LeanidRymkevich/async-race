import { ITrack, CarParams, TrackBTNsCallbacks } from '@src/spa/view/garage/track/types';
import IView from '@src/spa/view/types';

export interface ITracksPageView {
  getTracksNum(): number;
  addTracksToPage(properties: CarParams[], callbacks: TrackBTNsCallbacks): void;
  addTrackToPage(property: CarParams, callbacks: TrackBTNsCallbacks): void;
  removeTrackFromPage(id: number): boolean;
  getTrackFromPage(id: number): ITrack | null;
  assignSelectedTrack(id: number): void;
  cancelSelection(): void;
  getTracksFromPage(): ITrack[];
}

export type ITrackPage = ITracksPageView & IView;
