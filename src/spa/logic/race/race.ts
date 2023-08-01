import { IRace, OnWinCallback } from '@src/spa/logic/race/types';
import { ITrack } from '@src/spa/view/garage/track/types';

export default class Race implements IRace {
  private readonly tracks: ITrack[];

  public constructor(tracks: ITrack[]) {
    this.tracks = tracks;
  }

  public start(): void {
    this.tracks.forEach((track: ITrack): boolean => track.getStartBTN().getElement().dispatchEvent(new Event('click')));
  }

  public reset(): void {
    this.tracks.forEach((track: ITrack): boolean => track.getStopBTN().getElement().dispatchEvent(new Event('click')));
  }

  public onWinsHandler(callback: OnWinCallback): void {
    document.body.addEventListener('win', function func(event: Event): void {
      if (!(event instanceof CustomEvent)) return;
      callback(event.detail);
      document.body.removeEventListener('win', func);
    });
  }
}
