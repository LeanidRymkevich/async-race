import { CarCreateParams } from '@src/spa/logic/communicator/carsCommunicator/types';

export interface ICarGenerator {
  getCar(): CarCreateParams;
  getCars(number: number): CarCreateParams[];
}
