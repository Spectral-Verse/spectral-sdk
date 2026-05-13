import { SpectraErrorCode } from './errorCodes';

export class SpectraError extends Error {
  public readonly code: SpectraErrorCode;
  public readonly details?: any;

  constructor(code: SpectraErrorCode, message: string, details?: any) {
    super(message);
    this.name = 'SpectraError';
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, SpectraError.prototype);
  }

  public static fromRpcError(error: any): SpectraError {
    return new SpectraError(
      SpectraErrorCode.RPC_FAILURE,
      error.message || 'RPC request failed',
      error
    );
  }
}
