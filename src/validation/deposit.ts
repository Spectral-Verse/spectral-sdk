import { SpectralError } from '../errors/SpectralError';
import { SpectralErrorCode } from '../errors/errorCodes';

export function validateDepositAmount(amount: bigint): void {
  if (amount <= 0n) {
    throw new SpectralError(
      SpectralErrorCode.ZERO_AMOUNT,
      'Deposit amount must be greater than zero'
    );
  }
}
