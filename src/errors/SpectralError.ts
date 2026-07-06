import { SpectralErrorCode } from './errorCodes';

export class SpectralError extends Error {
  public readonly code: SpectralErrorCode;
  public readonly details?: any;

  constructor(code: SpectralErrorCode, message: string, details?: any) {
    super(message);
    this.name = 'SpectralError';
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, SpectralError.prototype);
  }

  public static fromRpcError(error: any): SpectralError {
    return new SpectralError(
      SpectralErrorCode.RPC_FAILURE,
      error.message || 'RPC request failed',
      error
    );
  }
}
