import {
  ICarCommunicator,
  CarCreateParams,
  EngineStartResp,
  EngineDriveResp,
} from '@src/spa/logic/communicator/carsCommunicator/types';
import Communicator from '@src/spa/logic/communicator/communicator';
import {
  METHODS,
  PATHS,
  QUERY_TAGS,
  QueryParams,
  getItemsResult,
  EngineStatus,
  EngineStartStopStatus,
} from '@src/spa/logic/communicator/types';
import { CarParams } from '@src/spa/view/garage/track/types';
import ServerInteractError from '@src/spa/logic/communicator/serverIneractError';

export default class CarsCommunicator extends Communicator implements ICarCommunicator {
  private static readonly instance: ICarCommunicator = new CarsCommunicator();
  public static readonly PAGE_LIMIT = 7;

  private readonly carsUrl: PATHS = PATHS.GARAGE;
  private readonly engineUrl: PATHS = PATHS.ENGINE;

  private constructor() {
    super();
  }

  public static getInstance(): ICarCommunicator {
    return this.instance;
  }

  public async getCars(_page?: number, _limit?: number): Promise<getItemsResult<CarParams[]>> {
    const queryParams: QueryParams = {};
    if (_page !== undefined) queryParams[QUERY_TAGS.PAGE] = _page;
    if (_limit !== undefined) queryParams[QUERY_TAGS.LIMIT] = _limit;

    return await this.getItems(this.carsUrl, queryParams);
  }

  public async getCar(id: number): Promise<CarParams> {
    return await this.getItem(this.carsUrl, id);
  }

  public async createCar(params: CarCreateParams): Promise<CarParams> {
    return await this.createItem(this.carsUrl, params);
  }

  public async updateCar(params: CarCreateParams, id: number): Promise<CarParams> {
    return await this.updateItem(this.carsUrl, params, id);
  }

  public async deleteCar(id: number): Promise<CarParams> {
    return await this.deleteItem(this.carsUrl, id);
  }

  public async engineStartStop(id: number, status: EngineStartStopStatus): Promise<EngineStartResp> {
    return this.engineInteraction<EngineStartResp>(id, status);
  }

  public async engineDrive(id: number): Promise<EngineDriveResp> {
    return this.engineInteraction<EngineDriveResp>(id, 'drive');
  }

  private async engineInteraction<T>(id: number, status: EngineStatus): Promise<T> {
    const queryParams: QueryParams = {
      [QUERY_TAGS.ID]: id,
      [QUERY_TAGS.STATUS]: status,
    };

    try {
      const response: Response = await fetch(this.getFullUrl(this.engineUrl, null, queryParams), {
        method: METHODS.PATCH,
      });

      if (!response.ok) throw new ServerInteractError(response.status);

      const result: T = await response.json();
      return result;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new ServerInteractError(null, 'Network error', error); // in case of a network error
      } else {
        throw error;
      }
    }
  }
}
