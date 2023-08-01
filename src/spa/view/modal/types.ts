import IView from '@src/spa/view/types';

export interface modalParams {
  carName: string;
  time: number;
}

export interface IModalView {
  setModalText(params: modalParams): void;
}

export type IModal = IModalView & IView;
