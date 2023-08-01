export default class DataBaseError<T> extends Error {
  private result: T | null = null;

  public constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }

  public setResult(result: T | null) {
    this.result = result;
  }

  public getResult(): T | null {
    return this.result;
  }
}
