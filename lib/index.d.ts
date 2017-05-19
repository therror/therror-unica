import { Classes as TherrorClasses, TherrorConstructor } from 'therror';
import Therror from 'therror';

export interface UnicaError {
  /**
   * Mixin create Unica errors with the provided unicaCode and server error
   * ```js
   * class MyCustomError extends UnicaError('PAYMENTS.NOT_ENOUGH_BALANCE', Therror.ServerError[402]) {}
   * // or
   * class MyCustomError extends UnicaError('PAYMENTS.NOT_ENOUGH_BALANCE', Therror.ServerError.PaymentRequired) {}
   * ```
   */
  <T extends Constructor<{}>>(unicaCode: string, Base: TherrorConstructor<TherrorClasses.ServerError>): Constructor<Classes.UnicaError & Therror> & TherrorConstructor<TherrorClasses.ServerError>;

  InvalidArgument: typeof UnicaErrors.InvalidArgument;
  FailedPrecondition: typeof UnicaErrors.FailedPrecondition;
  OutOfRange: typeof UnicaErrors.OutOfRange;
  Unauthenticated: typeof UnicaErrors.Unauthenticated;
  PermissionDenied: typeof UnicaErrors.PermissionDenied;
  NotFound: typeof UnicaErrors.NotFound;
  Aborted: typeof UnicaErrors.Aborted;
  AlreadyExists: typeof UnicaErrors.AlreadyExists;
  TooManyRequests: typeof UnicaErrors.TooManyRequests;
  DataLoss: typeof UnicaErrors.DataLoss;
  Internal: typeof UnicaErrors.Internal;
  NotImplemented: typeof UnicaErrors.NotImplemented;
  Unavailable: typeof UnicaErrors.Unavailable;
  Timeout: typeof UnicaErrors.Timeout;
}

declare var module: UnicaError;
export default module;

type Constructor<T> = new(...args: any[]) => T;

export declare namespace Classes {
  export interface UnicaError extends TherrorClasses.ServerError {
    /** The UNICA code for this error */
    unicaCode: string;
  }
  export class UnicaError implements UnicaError {}
}

declare namespace UnicaErrors {
  interface InvalidArgument extends Classes.UnicaError {}
  interface InvalidArgumentConstructor extends TherrorConstructor<InvalidArgument> {
    /** UnicaError with statusCode: 400, code: 'INVALID_ARGUMENT', level: 'info' */
    new(): InvalidArgument;
  }
  export let InvalidArgument: InvalidArgumentConstructor;

  interface FailedPrecondition extends Classes.UnicaError {}
  interface FailedPreconditionConstructor extends TherrorConstructor<FailedPrecondition> {
    /** UnicaError with statusCode: 400, code: 'FAILED_PRECONDITION', level: 'info' */
    new(): FailedPrecondition;
  }
  export let FailedPrecondition: FailedPreconditionConstructor;

  interface OutOfRange extends Classes.UnicaError {}
  interface OutOfRangeConstructor extends TherrorConstructor<OutOfRange> {
    /** UnicaError with statusCode: 400, code: 'OUT_OF_RANGE', level: 'info' */
    new(): OutOfRange;
  }
  export let OutOfRange: OutOfRangeConstructor;

  interface Unauthenticated extends Classes.UnicaError {}
  interface UnauthenticatedConstructor extends TherrorConstructor<Unauthenticated> {
    /** UnicaError with statusCode: 401, code: 'UNAUTHENTICATED', level: 'info' */
    new(): Unauthenticated;
  }
  export let Unauthenticated: UnauthenticatedConstructor;

  interface PermissionDenied extends Classes.UnicaError {}
  interface PermissionDeniedConstructor extends TherrorConstructor<PermissionDenied> {
    /** UnicaError with statusCode: 403, code: 'PERMISSION_DENIED', level: 'info' */
    new(): PermissionDenied;
  }
  export let PermissionDenied: PermissionDeniedConstructor;

  interface NotFound extends Classes.UnicaError {}
  interface NotFoundConstructor extends TherrorConstructor<NotFound> {
    /** UnicaError with statusCode: 404, code: 'NOT_FOUND', level: 'info' */
    new(): NotFound;
  }
  export let NotFound: NotFoundConstructor;

  interface Aborted extends Classes.UnicaError {}
  interface AbortedConstructor extends TherrorConstructor<Aborted> {
    /** UnicaError with statusCode: 409, code: 'ABORTED', level: 'info' */
    new(): Aborted;
  }
  export let Aborted: AbortedConstructor;

  interface AlreadyExists extends Classes.UnicaError {}
  interface AlreadyExistsConstructor extends TherrorConstructor<AlreadyExists> {
    /** UnicaError with statusCode: 409, code: 'ALREADY_EXISTS', level: 'info' */
    new(): AlreadyExists;
  }
  export let AlreadyExists: AlreadyExistsConstructor;

  interface TooManyRequests extends Classes.UnicaError {}
  interface TooManyRequestsConstructor extends TherrorConstructor<TooManyRequests> {
    /** UnicaError with statusCode: 429, code: 'TOO_MANY_REQUESTS', level: 'info' */
    new(): TooManyRequests;
  }
  export let TooManyRequests: TooManyRequestsConstructor;

  interface DataLoss extends Classes.UnicaError {}
  interface DataLossConstructor extends TherrorConstructor<DataLoss> {
    /** UnicaError with statusCode: 500, code: 'DATA_LOSS', level: 'error' */
    new(): DataLoss;
  }
  export let DataLoss: DataLossConstructor;

  interface Internal extends Classes.UnicaError {}
  interface InternalConstructor extends TherrorConstructor<Internal> {
    /** UnicaError with statusCode: 500, code: 'INTERNAL', level: 'error' */
    new(): Internal;
  }
  export let Internal: InternalConstructor;

  interface NotImplemented extends Classes.UnicaError {}
  interface NotImplementedConstructor extends TherrorConstructor<NotImplemented> {
    /** UnicaError with statusCode: 501, code: 'NOT_IMPLEMENTED', level: 'error' */
    new(): NotImplemented;
  }
  export let NotImplemented: NotImplementedConstructor;

  interface Unavailable extends Classes.UnicaError {}
  interface UnavailableConstructor extends TherrorConstructor<Unavailable> {
    /** UnicaError with statusCode: 503, code: 'UNAVAILABLE', level: 'error' */
    new(): Unavailable;
  }
  export let Unavailable: UnavailableConstructor;

  interface Timeout extends Classes.UnicaError {}
  interface TimeoutConstructor extends TherrorConstructor<Timeout> {
    /** UnicaError with statusCode: 504, code: 'TIMEOUT', level: 'error' */
    new(): Timeout;
  }
  export let Timeout: TimeoutConstructor;
}
