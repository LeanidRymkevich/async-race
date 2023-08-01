import IView from '@src/spa/view/types';

export interface ICarView {
  setCarColor(color: string): void;
  getColor(): string;
}

export type ICar = ICarView & IView;
