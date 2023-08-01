import { CarParams } from '@src/spa/view/garage/track/types';
import { EngineStartStopStatus, getItemsResult } from '@src/spa/logic/communicator/types';

export interface ICarCommunicator {
  getCars(_page?: number, _limit?: number): Promise<getItemsResult<CarParams[]>>;
  getCar(id: number): Promise<CarParams>;
  createCar(params: CarCreateParams): Promise<CarParams>;
  updateCar(params: CarCreateParams, id: number): Promise<CarParams>;
  deleteCar(id: number): Promise<CarParams>;
  engineStartStop(id: number, status: EngineStartStopStatus): Promise<EngineStartResp>;
  engineDrive(id: number): Promise<EngineDriveResp>;
}

export type CarCreateParams = Pick<CarParams, 'name' | 'color'>;

export interface EngineStartResp {
  velocity: number;
  distance: number;
}

export interface EngineDriveResp {
  success: boolean;
}
