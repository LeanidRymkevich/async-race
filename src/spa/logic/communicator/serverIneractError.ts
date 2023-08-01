export default class ServerInteractError extends Error {
  public readonly code: number | null;
  public readonly cause: Error | null;

  public constructor(code?: number | null, message?: string | null, cause?: Error) {
    super(message === null ? undefined : message);
    this.name = this.constructor.name;
    this.code = code === undefined ? null : code;
    this.cause = cause === undefined ? null : cause;
  }
}
