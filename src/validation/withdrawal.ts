import { SpectralError } from '../errors/SpectralError';
import { SpectralErrorCode } from '../errors/errorCodes';

export function validateWithdrawalShares(shares: bigint): void {
  if (shares <= 0n) {
    throw new SpectralError(
      SpectralErrorCode.ZERO_AMOUNT,
      'Withdrawal shares must be greater than zero'
    );
  }
}
