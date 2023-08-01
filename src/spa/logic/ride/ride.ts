import { IRide, WinEventParams } from '@src/spa/logic/ride/types';
import { ITrack } from '@src/spa/view/garage/track/types';
import { EngineStartResp, ICarCommunicator } from '@src/spa/logic/communicator/carsCommunicator/types';
import CarsCommunicator from '@src/spa/logic/communicator/carsCommunicator/carsCommunicator';
import ServerInteractError from '@src/spa/logic/communicator/serverIneractError';

export default class Ride implements IRide {
  private readonly communicator: ICarCommunicator = CarsCommunicator.getInstance();
  private readonly track: ITrack;
  private readonly passage: HTMLElement;
  private readonly car: HTMLElement;
  private readonly id: number;
  private timer = 0;

  public constructor(track: ITrack) {
    this.track = track;
    this.passage = track.getPassage().getElement();
    this.car = track.getCar().getView();
    this.id = track.getID();
  }

  public async start(): Promise<void> {
    try {
      const params: EngineStartResp = await this.communicator.engineStartStop(this.id, 'started');
      const duration: number = params.distance / params.velocity;
      this.animate(duration);
      await this.communicator.engineDrive(this.id);
    } catch (err) {
      if (err instanceof ServerInteractError) {
        this.stop();
      } else {
        throw err;
      }
    }
  }

  public async reset(): Promise<void> {
    try {
      await this.communicator.engineStartStop(this.id, 'stopped');
      this.stop();
      this.car.style.transform = `translateX(0px)`;
    } catch (err) {
      if (err instanceof ServerInteractError) {
        console.log(err);
        this.car.style.transform = `translateX(0px)`;
      } else {
        throw err;
      }
    }
  }

  private async stop(): Promise<void> {
    cancelAnimationFrame(this.timer);
  }

  private animate(duration: number): void {
    let currentX = 0;
    const flag: HTMLElement = this.track.getFlag().getElement();
    const frames: number = (duration / 1000) * 60;
    const endX: number = this.passage.clientWidth - this.car.offsetWidth;
    const dx: number = (endX - currentX) / frames;
    const flagPos: number = flag.offsetLeft;
    const carWidth: number = this.car.offsetWidth;
    let isWin = false;
    const start: number = Date.now();

    const translate = (): void => {
      currentX += dx;
      this.car.style.transformOrigin = 'right';
      this.car.style.transform = `translateX(${currentX}px)`;

      // throwing an Event when car is passing the flag point
      if (this.car.getClientRects()[0].left + carWidth > flagPos && !isWin) {
        isWin = true;
        const passedTime: number = Date.now() - start;
        const event: CustomEvent = this.getCustomEvent(passedTime);
        this.car.dispatchEvent(event);
      }

      if (currentX < endX) {
        this.timer = requestAnimationFrame(translate);
      }
    };

    translate();
  }

  private getCustomEvent(passedTime: number): CustomEvent<WinEventParams> {
    const name: string | null = this.track.getCarName().getElement().textContent;
    return new CustomEvent('win', {
      bubbles: true,
      detail: {
        carId: this.id,
        carName: name ? name : '',
        time: passedTime / 1000, // s
        color: this.track.getCar().getColor(),
      },
    });
  }
}
