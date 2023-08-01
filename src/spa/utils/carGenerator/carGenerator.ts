import { ICarGenerator } from '@src/spa/utils/carGenerator/types';
import { brands, models } from '@src/spa/utils/carGenerator/names';
import { CarCreateParams } from '@src/spa/logic/communicator/carsCommunicator/types';
import DataBaseError from '@src/spa/utils/carGenerator/dataBaseError';

// exclude situation when car color is black to prevent invisibility
// of this car on the black body background
const FORBIDDEN_COLOR = '#000000';

export default class CarGenerator implements ICarGenerator {
  private static readonly instance: ICarGenerator = new CarGenerator();
  private readonly names: string[] = [];
  private readonly colors: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): ICarGenerator {
    return this.instance;
  }

  public getCars(number: number): CarCreateParams[] {
    const result: CarCreateParams[] = [];
    for (let i = 1; i <= number; i += 1) {
      if (this.names.length >= brands.length * models.length) {
        const error = new DataBaseError<CarCreateParams[]>('Car names variety is exhausted!');
        error.setResult(result);
        throw error;
      }
      result.push(this.getCar());
    }
    return result;
  }

  public getCar(): CarCreateParams {
    return {
      name: this.generateName(),
      color: this.generateColor(),
    };
  }

  private generateName(): string {
    let car = '';

    do {
      const brand: number = this.generateNumber(0, brands.length - 1);
      const model: number = this.generateNumber(0, models.length - 1);
      car = `${brands[brand]} ${models[model]}`;
    } while (this.names.includes(car));

    this.names.push(car);
    return car;
  }

  private generateColor(): string {
    let color: string;
    const symbols = '0123456789abcdef';
    const from = 0;
    const to: number = symbols.length - 1;
    const colorLength = 6;

    for (;;) {
      color = '#';
      for (let i = 1; i <= colorLength; i += 1) {
        const num: number = this.generateNumber(from, to);
        color += symbols[num];
      }

      if (!this.colors.includes(color) && color !== FORBIDDEN_COLOR) break;
    }

    this.colors.push(color);
    return color;
  }

  private generateNumber(from: number, to: number): number {
    return from + Math.floor(Math.random() * (to - from + 1));
  }
}
