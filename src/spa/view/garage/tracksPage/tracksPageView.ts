import '@src/spa/view/garage/tracksPage/tracksPage.scss';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import { ITrack, CarParams, TrackBTNsCallbacks } from '@src/spa/view/garage/track/types';
import TrackView from '@src/spa/view/garage/track/trackView';
import { ITracksPageView } from '@src/spa/view/garage/tracksPage/types';

// tracks page properties
const TRACKS_PAGE_TAG = 'div';
const TRACKS_PAGE_CLASS = 'tracks-page';

//selected track class
const SELECTED_TRACK_CLASS = 'track_selected';

export default class TracksPageView extends View implements ITracksPageView {
  private readonly tracks: Map<number, ITrack> = new Map();

  public constructor(properties: CarParams[], callbacks: TrackBTNsCallbacks) {
    const params: ElementCreatorParams = {
      tag: TRACKS_PAGE_TAG,
      classNames: [TRACKS_PAGE_CLASS],
    };
    super(params);
    this.addTracksToPage(properties, callbacks);
  }

  public getTracksNum(): number {
    return this.tracks.size;
  }

  public assignSelectedTrack(id: number): void {
    this.tracks.forEach((track: ITrack): void => {
      track.getViewCreator().removeClasses(SELECTED_TRACK_CLASS);
    });
    this.tracks.get(id)?.getViewCreator().setClasses([SELECTED_TRACK_CLASS]);
  }

  public cancelSelection(): void {
    this.tracks.forEach((track: ITrack): void => {
      track.getViewCreator().removeClasses(SELECTED_TRACK_CLASS);
    });
  }

  public addTracksToPage(properties: CarParams[], callbacks: TrackBTNsCallbacks): void {
    this.getView().innerHTML = '';
    this.tracks.clear();
    properties.forEach((property: CarParams): void => {
      const track: ITrack = new TrackView(property, callbacks);
      this.tracks.set(property.id, track);
      this.getViewCreator().addInnerElement(track.getViewCreator());
    });
  }

  public addTrackToPage(property: CarParams, callbacks: TrackBTNsCallbacks): void {
    const track: ITrack = new TrackView(property, callbacks);
    this.tracks.set(property.id, track);
    this.getViewCreator().addInnerElement(track.getViewCreator());
  }

  public removeTrackFromPage(id: number): boolean {
    const track: ITrack | undefined = this.tracks.get(id);

    if (!track) return false;

    this.tracks.delete(id);
    track.getView().remove();
    return true;
  }

  public getTrackFromPage(id: number): ITrack | null {
    const track: ITrack | undefined = this.tracks.get(id);

    if (!track) return null;
    return track;
  }

  public getTracksFromPage(): ITrack[] {
    return Array.from(this.tracks.values());
  }
}
