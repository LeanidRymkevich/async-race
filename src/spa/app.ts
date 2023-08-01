import '@src/spa/common.scss';
import { IApp } from '@src/spa/types';
import { IController } from '@src/spa/logic/controller/types';
import Controller from '@src/spa/logic/controller/controller';

export default class App implements IApp {
  private static readonly instance = new App();
  private readonly controller: IController = Controller.getInstance();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): IApp {
    return this.instance;
  }

  public async start(): Promise<void> {
    await this.controller.startRendering();
  }
}
