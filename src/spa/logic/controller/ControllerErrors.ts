export abstract class ControllerError extends Error {
  public readonly cause: Error | null;

  public constructor(message?: string | null, cause?: Error | null) {
    super(message === null ? undefined : message);
    this.cause = cause === undefined ? null : cause;
    this.name = this.constructor.name;
  }
}

export class GarageRenderingError extends ControllerError {
  public constructor(message?: string | null, cause?: Error | null) {
    super(message, cause);
  }
}

export class WinnersRenderingError extends ControllerError {
  public constructor(message?: string | null, cause?: Error | null) {
    super(message, cause);
  }
}
