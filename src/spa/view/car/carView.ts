import '@src/spa/view/car/car.scss';
import { ElementCreatorParams } from '@src/spa/utils/elementCreator/types';
import View from '@src/spa/view/view';
import { ICarView } from '@src/spa/view/car/types';

// car properties
const CAR_TAG = 'div';
const CAR_CLASS_NAME = 'car';

export default class CarView extends View implements ICarView {
  private color: string;

  public constructor(color: string) {
    const params: ElementCreatorParams = {
      tag: CAR_TAG,
      classNames: [CAR_CLASS_NAME],
    };
    super(params);
    this.color = color;
    this.setCarColor(color);
  }

  public getColor(): string {
    return this.color;
  }

  public setCarColor(color: string): void {
    this.getView().style.backgroundColor = color;
  }
}
