import { METHODS, HEADERS, QueryParams, getItemsResult } from '@src/spa/logic/communicator/types';
import ServerInteractError from './serverIneractError';

const CONTENT_TYPE_HEADER_VALUE = 'application/json';

export default abstract class Communicator {
  private readonly baseUrl: string;

  protected constructor() {
    this.baseUrl = 'http://127.0.0.1:3000';
  }

  /**
   * @param params {key1: value1, key2: value2, ...}
   */
  protected getQueryString(params: QueryParams): string {
    return Object.entries(params)
      .reduce((acc: string, item: [string, string]): string => `${acc}${item[0]}=${item[1]}&`, '')
      .slice(0, -1);
  }

  protected getFullUrl(itemsUrl: string, id?: number | null, queryParams?: QueryParams | null): string {
    const queryString: string = this.getQueryString(queryParams || {});
    let result = `${this.baseUrl}${itemsUrl}`;
    if (id !== undefined && id !== null) result += `/${id}`;
    if (queryParams) result += `?${queryString}`;
    return result;
  }

  protected async getItems<T>(itemsUrl: string, queryParams?: QueryParams): Promise<getItemsResult<T>> {
    try {
      const response: Response = await fetch(this.getFullUrl(itemsUrl, null, queryParams));

      if (!response.ok) throw new ServerInteractError(response.status);

      const result: T = await response.json();
      const itemsAmount: string | null = response.headers.get(HEADERS.X_TOTAL_COUNT);
      const amount = itemsAmount ? +itemsAmount : 0;
      return { result, amount };
    } catch (error) {
      if (error instanceof TypeError) {
        throw new ServerInteractError(null, 'Network error', error); // in case of a network error
      } else {
        throw error;
      }
    }
  }

  protected async getItem<T>(itemsUrl: string, id: number): Promise<T> {
    try {
      const response: Response = await fetch(this.getFullUrl(itemsUrl, id));

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

  protected async createItem<T, K>(itemsUrl: string, item: K): Promise<T> {
    try {
      const response: Response = await fetch(this.getFullUrl(itemsUrl), {
        method: METHODS.POST,
        headers: {
          [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_HEADER_VALUE,
        },
        body: JSON.stringify(item),
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

  protected async updateItem<T, K>(itemsUrl: string, item: K, id: number): Promise<T> {
    try {
      const response: Response = await fetch(this.getFullUrl(itemsUrl, id), {
        method: METHODS.PUT,
        headers: {
          [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_HEADER_VALUE,
        },
        body: JSON.stringify(item),
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

  protected async deleteItem<T>(itemsUrl: string, id: number): Promise<T> {
    try {
      const response: Response = await fetch(this.getFullUrl(itemsUrl, id), {
        method: METHODS.DELETE,
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
