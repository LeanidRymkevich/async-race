import App from '@src/spa/app';
import { IApp } from '@src/spa/types';

const app: IApp = App.getInstance();
app.start();
