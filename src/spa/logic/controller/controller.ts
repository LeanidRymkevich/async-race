import CarGenerator from '@src/spa/utils/carGenerator/carGenerator';
import { ICarGenerator } from '@src/spa/utils/carGenerator/types';
import GarageView from '@src/spa/view/garage/garageView';
import { IGarage } from '@src/spa/view/garage/types';
import HeaderView from '@src/spa/view/header/headerView';
import { IHeader } from '@src/spa/view/header/types';
import { IController, sortParams } from '@src/spa/logic/controller/types';
import { CarCreateParams, ICarCommunicator } from '@src/spa/logic/communicator/carsCommunicator/types';
import CarsCommunicator from '@src/spa/logic/communicator/carsCommunicator/carsCommunicator';
import {
  CreateWinnerParams,
  IWinnersCommunicator,
  WinnerParams,
} from '@src/spa/logic/communicator/winnersCommunicator/types';
import WinnersCommunicator from '@src/spa/logic/communicator/winnersCommunicator/winnersCommunicator';
import { CarParams, ITrack, TrackBTNsCallbacks } from '@src/spa/view/garage/track/types';
import { getItemsResult, orderType, sortType } from '@src/spa/logic/communicator/types';
import { IWinners } from '@src/spa/view/winners/types';
import WinnersView from '@src/spa/view/winners/winnersView';
import { ITableRow, tableRowParams } from '@src/spa/view/winners/row/tableRow/types';
import { IElementCreator } from '@src/spa/utils/elementCreator/types';
import ServerInteractError from '@src/spa/logic/communicator/serverIneractError';
import { ControllerError, GarageRenderingError, WinnersRenderingError } from './ControllerErrors';
import ElementCreator from '@src/spa/utils/elementCreator/elementCreator';
import { IPageNum } from '@src/spa/view/pageNum/types';
import { IPageTitle } from '@src/spa/view/pageTitle/types';
import { ITrackPage } from '@src/spa/view/garage/tracksPage/types';
import DataBaseError from '@src/spa/utils/carGenerator/dataBaseError';
import { IRide, WinEventParams } from '@src/spa/logic/ride/types';
import Ride from '@src/spa/logic/ride/ride';
import { IRace } from '@src/spa/logic/race/types';
import Race from '@src/spa/logic/race/race';
import { IModal } from '@src/spa/view/modal/types';
import ModalView from '@src/spa/view/modal/modalView';
import { ITable } from '@src/spa/view/winners/table/types';

// class to show error when car names are exhausted
const DATA_EXHAUSTED_CLASS = 'data-exhausted';

// update btn hint class
const UPDATE_BTN_HINT_CLASS = 'update-btn-hint';

// modal pop-up showing duration
const MODAL_SHOW_DURATION = 5000; // ms

export default class Controller implements IController {
  private static readonly instance: IController = new Controller();

  // common
  private readonly generator: ICarGenerator = CarGenerator.getInstance();
  private readonly carsCommunicator: ICarCommunicator = CarsCommunicator.getInstance();
  private readonly winnersCommunicator: IWinnersCommunicator = WinnersCommunicator.getInstance();
  private readonly header: IHeader;
  private readonly toGarageBTN: IElementCreator;
  private readonly toWinnersBTN: IElementCreator;

  // garage
  private garageItemsNum = 0;
  private garageCurrentPage = 1;
  private selectedTrack: ITrack | null = null;
  private garage: IGarage | null = null;
  private garagePageNum: IPageNum | null = null;
  private garagePageTitle: IPageTitle | null = null;
  private creatingTextInput: IElementCreator | null = null;
  private updatingTextInput: IElementCreator | null = null;
  private creatingColorInput: IElementCreator | null = null;
  private updatingColorInput: IElementCreator | null = null;
  private creatingBTN: IElementCreator | null = null;
  private updatingBTN: IElementCreator | null = null;
  private raceBTN: IElementCreator | null = null;
  private resetBTN: IElementCreator | null = null;
  private generateBTN: IElementCreator | null = null;
  private garageNextPageBTN: IElementCreator | null = null;
  private garagePrevPageBTN: IElementCreator | null = null;
  private tracks: ITrackPage | null = null;
  private race: IRace | null = null;
  private modal: IModal = new ModalView();

  // winners
  private winnersItemsNum = 0;
  private winnersCurrentPage = 1;
  private winners: IWinners | null = null;
  private winnersPageNum: IPageNum | null = null;
  private winnersPageTitle: IPageTitle | null = null;
  private winnersNextPageBTN: IElementCreator | null = null;
  private winnersPrevPageBTN: IElementCreator | null = null;
  private table: ITable | null = null;
  private sortByWinsCell: IElementCreator | null = null;
  private sortByTimeCell: IElementCreator | null = null;
  private sortByWinsOrder: orderType = orderType.DESC;
  private sortByTimeOrder: orderType = orderType.DESC;
  private sortType: sortType = sortType.ID;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    this.header = new HeaderView();
    this.toGarageBTN = this.header.getToGarageBTN();
    this.toWinnersBTN = this.header.getToWinnersBTN();
  }

  public static getInstance(): IController {
    return this.instance;
  }

  public async startRendering(): Promise<void> {
    document.body.append(this.header.getView());

    try {
      await this.getStartGarageView();
      await this.getStartWinnersView();
    } catch (err) {
      const error: ControllerError | null = err instanceof ControllerError ? err : null;
      document.body.append(this.getErrorMessageElement(error).getElement());
    }

    // garage
    if (this.garage) document.body.append(this.garage.getView());
    this.garagePageNum?.setItemNum(this.garageCurrentPage);
    this.garagePageTitle?.setItemNum(this.garageItemsNum);
    this.garageNavBTNsCheck();

    //winners
    this.winnersPageNum?.setItemNum(this.winnersCurrentPage);
    this.winnersPageTitle?.setItemNum(this.winnersItemsNum);
    this.winnersNavBTNsCheck();

    this.assignListeners();
  }

  private async getStartGarageView(): Promise<IGarage> {
    try {
      const response: getItemsResult<CarParams[]> = await this.carsCommunicator.getCars(1, CarsCommunicator.PAGE_LIMIT);
      const cars: CarParams[] = response.result;
      const garage: IGarage = new GarageView(cars, this.getTracksCallbacks());
      this.garage = garage;
      this.garageItemsNum = response.amount;
      this.getGarageInteractElements(garage);
      return garage;
    } catch (err) {
      const error: Error | null = err instanceof Error ? err : null;
      throw new GarageRenderingError(null, error);
    }
  }

  private getGarageInteractElements(garage: IGarage) {
    this.garagePageNum = garage.getPageNum();
    this.garagePageTitle = garage.getPageTitle();
    this.creatingTextInput = garage.getOptions().getCreatingTextInput();
    this.updatingTextInput = garage.getOptions().getUpdatingTextInput();
    this.creatingColorInput = garage.getOptions().getCreatingColorInput();
    this.updatingColorInput = garage.getOptions().getUpdatingColorInput();
    this.creatingBTN = garage.getOptions().getCreatingBTN();
    this.updatingBTN = garage.getOptions().getUpdatingBTN();
    this.raceBTN = garage.getOptions().getRaceBTN();
    this.resetBTN = garage.getOptions().getResetBTN();
    this.generateBTN = garage.getOptions().getGenerateBTN();
    this.garageNextPageBTN = garage.getNavigation().getNextPageBTN();
    this.garagePrevPageBTN = garage.getNavigation().getPrevPageBTN();
    this.tracks = garage.getTracks();
  }

  private async getStartWinnersView(): Promise<IWinners> {
    try {
      const response: getItemsResult<WinnerParams[]> = await this.winnersCommunicator.getWinners(
        1,
        WinnersCommunicator.PAGE_LIMIT
      );
      const winners: WinnerParams[] = response.result;

      const paramsOfTable: (tableRowParams | null)[] = await Promise.all(this.getTableRowParams(...winners));
      const arr: tableRowParams[] = [];
      paramsOfTable.forEach((item: tableRowParams | null): void => {
        if (item) arr.push(item);
      });

      const winnersView: IWinners = new WinnersView(arr);
      this.winners = winnersView;
      this.winnersItemsNum = response.amount;
      this.winnersPageNum = winnersView.getPageNum();
      this.winnersPageTitle = winnersView.getPageTitle();
      this.getWinnersIntetactElements(winnersView);
      return winnersView;
    } catch (err) {
      const error: Error | null = err instanceof Error ? err : null;
      throw new WinnersRenderingError(null, error);
    }
  }

  private getWinnersIntetactElements(winners: IWinners): void {
    this.winnersNextPageBTN = winners.getNavigation().getNextPageBTN();
    this.winnersPrevPageBTN = winners.getNavigation().getPrevPageBTN();
    this.table = winners.getTable();
    this.sortByWinsCell = winners.getTable().getHeader().getWinsCell();
    this.sortByTimeCell = winners.getTable().getHeader().getTimeCell();
  }

  private getTableRowParams(...params: WinnerParams[]): Promise<tableRowParams | null>[] {
    return params.map(
      async (winner: WinnerParams, idx: number): Promise<tableRowParams | null> => {
        try {
          const car: CarParams = await this.carsCommunicator.getCar(winner.id);
          return {
            id: winner.id,
            rowNum: (idx += 1),
            color: car.color,
            carName: car.name,
            wins: winner.wins,
            time: winner.time,
          };
        } catch (err) {
          if (err instanceof ServerInteractError && err.code) {
            return null;
          } else {
            throw err;
          }
        }
      }
    );
  }

  private assignListeners(): void {
    this.toGarageBTN.getElement().addEventListener('click', this.toGarageBTNHandler.bind(this));
    this.toWinnersBTN.getElement().addEventListener('click', this.toWinnersBTNHandler.bind(this));
    this.generateBTN?.getElement().addEventListener('click', this.generateBTNHandler.bind(this));
    this.garageNextPageBTN?.setListeners([{ event: 'click', callback: this.garageNextBTNHandler.bind(this) }]);
    this.garagePrevPageBTN?.setListeners([{ event: 'click', callback: this.garagePrevBTNHandler.bind(this) }]);
    this.creatingBTN?.setListeners([{ event: 'click', callback: this.createBTNHandler.bind(this) }]);
    this.updatingBTN?.setListeners([{ event: 'click', callback: this.updateBTNHandler.bind(this) }]);
    this.raceBTN?.setListeners([{ event: 'click', callback: this.raceBTNHandler.bind(this) }]);
    this.resetBTN?.setListeners([{ event: 'click', callback: this.resetBTNHandler.bind(this) }]);
    this.winnersNextPageBTN?.setListeners([{ event: 'click', callback: this.winnersNextBTNHandler.bind(this) }]);
    this.winnersPrevPageBTN?.setListeners([{ event: 'click', callback: this.winnersPrevBTNHandler.bind(this) }]);
    this.sortByWinsCell?.setListeners([{ event: 'click', callback: this.sortByWinsCellHandler.bind(this) }]);
    this.sortByTimeCell?.setListeners([{ event: 'click', callback: this.sortByTimeCellHandler.bind(this) }]);
  }

  private toGarageBTNHandler(): void {
    this.winners?.getView().remove();
    if (this.garage) {
      document.body.append(this.garage.getView());
    }
  }

  private toWinnersBTNHandler(): void {
    this.garage?.getView().remove();
    if (this.winners) {
      document.body.append(this.winners.getView());
    }
  }

  private generateBTNHandler(): void {
    const CARS_GENERATING_AMOUNT = 100;
    try {
      const carCreateParams: CarCreateParams[] = this.generator.getCars(CARS_GENERATING_AMOUNT);
      this.addNewCars(...carCreateParams);
    } catch (err) {
      if (err instanceof DataBaseError) {
        const carCreateParams: CarCreateParams[] = err.getResult();
        this.addNewCars(...carCreateParams);
        this.generateBTN?.setClasses([DATA_EXHAUSTED_CLASS]);
        this.generateBTN?.setAttributes({ disabled: '' });
      } else {
        console.log(err);
      }
    }
  }

  private addNewCars(...params: CarCreateParams[]): void {
    let currentTracksNum = 0;
    if (this.tracks) currentTracksNum = this.tracks.getTracksNum();

    params.forEach(
      async (param: CarCreateParams): Promise<void> => {
        const carParam: CarParams = await this.carsCommunicator.createCar(param);
        if (CarsCommunicator.PAGE_LIMIT - currentTracksNum !== 0) {
          currentTracksNum += 1;
          this.tracks?.addTrackToPage(carParam, this.getTracksCallbacks());
        }
      }
    );

    if (this.garagePageTitle) {
      this.garagePageTitle.setItemNum(this.garagePageTitle.getItemsNum() + params.length);
    }

    this.garageItemsNum += params.length;
    this.garageNavBTNsCheck();
  }

  private async garageNextBTNHandler(): Promise<void> {
    try {
      const pageNum = this.garageCurrentPage + 1;
      await this.garagePageLoad(pageNum);
      this.garageNavBTNsCheck();
    } catch (err) {
      const error: Error | null = err instanceof Error ? err : null;
      throw new GarageRenderingError(null, error);
    }
  }

  private async garagePrevBTNHandler(): Promise<void> {
    try {
      const pageNum = this.garageCurrentPage - 1;
      await this.garagePageLoad(pageNum);
      this.garageNavBTNsCheck();
    } catch (err) {
      const error: Error | null = err instanceof Error ? err : null;
      throw new GarageRenderingError(null, error);
    }
  }

  private garageNavBTNsCheck(): void {
    if (this.garageCurrentPage === 1) {
      this.garagePrevPageBTN?.setAttributes({ disabled: '' });
    } else {
      this.garagePrevPageBTN?.removeAttribute('disabled');
    }

    if (this.garageItemsNum > CarsCommunicator.PAGE_LIMIT * this.garageCurrentPage) {
      this.garageNextPageBTN?.removeAttribute('disabled');
    } else {
      this.garageNextPageBTN?.setAttributes({ disabled: '' });
    }
  }

  private async garagePageLoad(pageNum: number): Promise<void> {
    const response: getItemsResult<CarParams[]> = await this.carsCommunicator.getCars(
      pageNum,
      CarsCommunicator.PAGE_LIMIT
    );
    const cars: CarParams[] = response.result;
    this.tracks?.addTracksToPage(cars, this.getTracksCallbacks());
    this.garageCurrentPage = pageNum;
    this.garagePageNum?.setItemNum(pageNum);
    this.garagePageTitle?.setItemNum(this.garageItemsNum);
    this.garagePageNum?.setItemNum(this.garageCurrentPage);
  }

  private async createBTNHandler(): Promise<void> {
    const textInput: HTMLElement | undefined = this.creatingTextInput?.getElement();
    const colorInput: HTMLElement | undefined = this.creatingColorInput?.getElement();

    if (!textInput || !(textInput instanceof HTMLInputElement)) return;
    if (!colorInput || !(colorInput instanceof HTMLInputElement)) return;

    const params: CarCreateParams = {
      name: textInput.value,
      color: colorInput.value,
    };

    try {
      this.addNewCars(params);
    } catch (err) {
      console.log(err);
    }
  }

  private async updateBTNHandler(): Promise<void> {
    if (!this.selectedTrack) {
      const timeout = 5000;
      this.updatingBTN?.setClasses([UPDATE_BTN_HINT_CLASS]);
      setTimeout((): void => this.updatingBTN?.removeClasses(UPDATE_BTN_HINT_CLASS), timeout);
      return;
    }

    const id: number = this.selectedTrack.getID();
    const textInput: HTMLElement | undefined = this.updatingTextInput?.getElement();
    const colorInput: HTMLElement | undefined = this.updatingColorInput?.getElement();

    if (!textInput || !(textInput instanceof HTMLInputElement)) return;
    if (!colorInput || !(colorInput instanceof HTMLInputElement)) return;

    const params: CarCreateParams = {
      name: textInput.value,
      color: colorInput.value,
    };

    try {
      this.carsCommunicator.updateCar(params, id);
    } catch (err) {
      console.log(err);
    }
    this.selectedTrack.getCar().setCarColor(params.color);
    this.selectedTrack.getCarName().setTextContent(params.name);

    const row: ITableRow | null | undefined = this.winners?.getTable().getRowFromPage(id);
    if (!row) return;

    row.getRowCar().setCarColor(params.color);
    row.updateCarName(params.name);
  }

  private getErrorMessageElement(error?: ControllerError | null): IElementCreator {
    const message = 'Network error occurs!';
    const element: IElementCreator = new ElementCreator({ tag: 'h3' });
    element.setTextContent(`${message}\n${error ? error.cause : ''}`);
    return element;
  }

  private getTracksCallbacks(): TrackBTNsCallbacks {
    return {
      selectBTNCallback: this.selectBTNHandler.bind(this),
      removeBTNCallback: this.removeBTNHandler.bind(this),
      startBTNCallback: this.startBTNHandler.bind(this),
      stopBTNCallback: this.stopBTNHandler.bind(this),
    };
  }

  private selectBTNHandler(track: ITrack): void {
    const id: number = track.getID();

    if (track === this.selectedTrack) {
      this.tracks?.cancelSelection();
      this.selectedTrack = null;
    } else {
      this.tracks?.assignSelectedTrack(id);
      this.selectedTrack = track;
    }
  }

  private async removeBTNHandler(track: ITrack): Promise<void> {
    const id: number = track.getID();

    try {
      await this.carsCommunicator.deleteCar(id);
      await this.winnersCommunicator.deleteWinner(id);
    } catch (err) {
      console.log(err);
    }
    await this.removeCarFromGarage(id);
    await this.removeWinnerFromTable(id);
  }

  private async removeCarFromGarage(id: number): Promise<void> {
    if (!this.tracks) return;

    if (this.tracks.getTracksNum() === 1 && this.garageCurrentPage !== 1) {
      this.tracks.removeTrackFromPage(id);
      this.garageCurrentPage -= 1;
      this.garageItemsNum -= 1;
      await this.garagePageLoad(this.garageCurrentPage);
      this.garageNavBTNsCheck();
    } else {
      this.tracks.removeTrackFromPage(id);
      this.garageItemsNum -= 1;
      await this.garagePageLoad(this.garageCurrentPage);
      this.garageNavBTNsCheck();
    }
  }

  private startBTNHandler(track: ITrack): void {
    const ride: IRide = new Ride(track);
    track.setRideObj(ride);
    ride.start();
    track.getStartBTN().setAttributes({ disabled: '' });
    track.getStopBTN().removeAttribute('disabled');
    this.raceBTN?.setAttributes({ disabled: '' });
    this.raceBTN?.setClasses(['race-btn-hint']);
  }

  private stopBTNHandler(track: ITrack): void {
    const ride: IRide | null = track.getRideObj();
    if (!ride) return;
    ride.reset();
    track.getStopBTN().setAttributes({ disabled: '' });
    track.getStartBTN().removeAttribute('disabled');
    this.raceBTN?.removeAttribute('disabled');
    this.raceBTN?.removeClasses('race-btn-hint');
  }

  private raceBTNHandler(): void {
    if (!this.tracks) return;
    this.race = new Race(this.tracks.getTracksFromPage());
    this.race.start();
    this.race.onWinsHandler(this.OnWinAction.bind(this));
    this.resetBTN?.removeAttribute('disabled');
  }

  private resetBTNHandler(): void {
    if (!this.race) return;
    this.race.reset();
    this.resetBTN?.setAttributes({ disabled: '' });
  }

  private async OnWinAction(winner: WinEventParams) {
    const modalShowDuration = MODAL_SHOW_DURATION;
    this.modal.setModalText({ carName: winner.carName, time: winner.time });
    document.body.append(this.modal.getView());
    setTimeout((): void => this.modal.getView().remove(), modalShowDuration);
    this.addWinner(winner);
  }

  //___________________________________________________________________
  // winner page section

  private async addWinner(winner: WinEventParams): Promise<void> {
    let winnerParams: WinnerParams | null;
    try {
      winnerParams = await this.winnersCommunicator.getWinner(winner.carId);
    } catch (err) {
      if (err instanceof ServerInteractError) {
        winnerParams = null;
      } else {
        throw err;
      }
    }
    try {
      if (winnerParams) {
        // update winner
        const newParams: CreateWinnerParams = {
          wins: winnerParams.wins + 1,
          time: winnerParams.time > winner.time ? winner.time : winnerParams.time,
        };
        const resp: WinnerParams = await this.winnersCommunicator.updateWinner(newParams, winner.carId);
        this.updateWinnerInTable(resp);
      } else {
        // create winner
        const params: CreateWinnerParams = { wins: 1, time: winner.time };
        const resp: WinnerParams = await this.winnersCommunicator.createWinner(params);

        if (!this.table) return;
        const rowParam: tableRowParams = {
          id: resp.id,
          rowNum: this.table.getRowsNum() + 1,
          color: winner.color,
          carName: winner.carName,
          wins: 1,
          time: winner.time,
        };
        this.createWinnerInTable(rowParam);
      }
    } catch (err) {
      console.log(err);
    }
  }

  private updateWinnerInTable(winner: WinnerParams): void {
    if (!this.table) return;
    const row: ITableRow | null = this.table.getRowFromPage(winner.id);
    if (!row) return;
    row.updateWins(winner.wins);
    row.updateTime(winner.time);
  }

  private createWinnerInTable(params: tableRowParams): void {
    if (!this.table) return;
    this.winnersItemsNum += 1;
    this.winnersPageTitle?.setItemNum(this.winnersItemsNum);
    this.winnersNavBTNsCheck();
    if (this.table.getRowsNum() >= WinnersCommunicator.PAGE_LIMIT) return;
    this.table.addRowToTable(params);
  }

  private winnersNavBTNsCheck(): void {
    if (this.winnersCurrentPage === 1) {
      this.winnersPrevPageBTN?.setAttributes({ disabled: '' });
    } else {
      this.winnersPrevPageBTN?.removeAttribute('disabled');
    }

    if (this.winnersItemsNum > WinnersCommunicator.PAGE_LIMIT * this.winnersCurrentPage) {
      this.winnersNextPageBTN?.removeAttribute('disabled');
    } else {
      this.winnersNextPageBTN?.setAttributes({ disabled: '' });
    }
  }

  private async winnersPageLoad(pageNum: number): Promise<void> {
    const sortParams: sortParams = this.getOrderAndSortParams();
    const response: getItemsResult<WinnerParams[]> = await this.winnersCommunicator.getWinners(
      pageNum,
      WinnersCommunicator.PAGE_LIMIT,
      sortParams._sort,
      sortParams._order
    );
    const winners: WinnerParams[] = response.result;
    const cars: CarParams[] = await Promise.all(
      winners.map(
        async (winner: WinnerParams): Promise<CarParams> => {
          return await this.carsCommunicator.getCar(winner.id);
        }
      )
    );
    let counter = 0;
    const params: tableRowParams[] = winners.map(
      (winner: WinnerParams, idx: number): tableRowParams => {
        counter += 1;
        return {
          id: winner.id,
          rowNum: (pageNum - 1) * WinnersCommunicator.PAGE_LIMIT + counter,
          color: cars[idx].color,
          carName: cars[idx].name,
          wins: winner.wins,
          time: winner.time,
        };
      }
    );
    this.table?.addRowsToTable(...params);
    this.winnersCurrentPage = pageNum;
    this.winnersPageNum?.setItemNum(pageNum);
    this.winnersPageTitle?.setItemNum(this.winnersItemsNum);
  }

  private getOrderAndSortParams(): sortParams {
    let _sort: sortType | undefined;
    let _order: orderType | undefined;
    if (this.sortType === sortType.ID) {
      _sort = undefined;
      _order = undefined;
    } else if (this.sortType === sortType.WINS) {
      _sort = sortType.WINS;
      _order = this.sortByWinsOrder;
    } else {
      _sort = sortType.TIME;
      _order = this.sortByTimeOrder;
    }

    return {
      _order,
      _sort,
    };
  }

  private async winnersNextBTNHandler(): Promise<void> {
    try {
      const pageNum = this.winnersCurrentPage + 1;
      await this.winnersPageLoad(pageNum);
      this.winnersNavBTNsCheck();
    } catch (err) {
      const error: Error | null = err instanceof Error ? err : null;
      throw new WinnersRenderingError(null, error);
    }
  }

  private async winnersPrevBTNHandler(): Promise<void> {
    try {
      const pageNum = this.winnersCurrentPage - 1;
      await this.winnersPageLoad(pageNum);
      this.winnersNavBTNsCheck();
    } catch (err) {
      const error: Error | null = err instanceof Error ? err : null;
      throw new WinnersRenderingError(null, error);
    }
  }

  private async removeWinnerFromTable(id: number): Promise<void> {
    if (!this.table) return;

    if (this.table.getRowsNum() === 1 && this.winnersCurrentPage !== 1) {
      this.table.removeRowFromTable(id);
      this.winnersCurrentPage -= 1;
      this.winnersItemsNum -= 1;
      await this.winnersPageLoad(this.winnersCurrentPage);
      this.winnersNavBTNsCheck();
    } else {
      this.table.removeRowFromTable(id);
      this.winnersItemsNum -= 1;
      await this.winnersPageLoad(this.winnersCurrentPage);
      this.winnersNavBTNsCheck();
    }
  }

  private async sortByWinsCellHandler(): Promise<void> {
    this.sortType = sortType.WINS;
    this.sortByTimeOrder = orderType.DESC;
    this.table?.getHeader().setTimeCellModifier();

    this.sortByWinsOrder = this.sortByWinsOrder === orderType.DESC ? orderType.ASC : orderType.DESC;
    this.table?.getHeader().setWinsCellModifier(this.sortByWinsOrder);
    this.winnersPageLoad(1);
    this.winnersPrevPageBTN?.setAttributes({ disabled: '' });
    this.winnersNextPageBTN?.removeAttribute('disabled');
  }

  private async sortByTimeCellHandler(): Promise<void> {
    this.sortType = sortType.TIME;
    this.sortByWinsOrder = orderType.DESC;
    this.table?.getHeader().setWinsCellModifier();

    this.sortByTimeOrder = this.sortByTimeOrder === orderType.DESC ? orderType.ASC : orderType.DESC;
    this.table?.getHeader().setTimeCellModifier(this.sortByTimeOrder);
    this.winnersPageLoad(1);
    this.winnersPrevPageBTN?.setAttributes({ disabled: '' });
    this.winnersNextPageBTN?.removeAttribute('disabled');
  }
}
