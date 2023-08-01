export enum PATHS {
  GARAGE = '/garage',
  WINNERS = '/winners',
  ENGINE = '/engine',
}

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export enum HEADERS {
  CONTENT_TYPE = 'Content-Type',
  X_TOTAL_COUNT = 'X-Total-Count',
}

export enum QUERY_TAGS {
  LIMIT = '_limit',
  PAGE = '_page',
  SORT = '_sort',
  ORDER = '_order',
  ID = 'id',
  STATUS = 'status',
}

export enum sortType {
  ID = 'id',
  WINS = 'wins',
  TIME = 'time',
}

export enum orderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type EngineStartStopStatus = 'started' | 'stopped';

export type EngineDriveStatus = 'drive';

export type EngineStatus = EngineStartStopStatus | EngineDriveStatus;

export interface QueryParams {
  [QUERY_TAGS.LIMIT]?: number;
  [QUERY_TAGS.PAGE]?: number;
  [QUERY_TAGS.SORT]?: sortType;
  [QUERY_TAGS.ORDER]?: orderType;
  [QUERY_TAGS.ID]?: number;
  [QUERY_TAGS.STATUS]?: EngineStatus;
}

export interface getItemsResult<T> {
  result: T;
  amount: number;
}
