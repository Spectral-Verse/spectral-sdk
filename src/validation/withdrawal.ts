import { SpectraError } from '../errors/SpectraError';
import { SpectraErrorCode } from '../errors/errorCodes';

export function validateWithdrawalShares(shares: bigint): void {
  if (shares <= 0n) {
    throw new SpectraError(SpectraErrorCode.ZERO_AMOUNT, 'Withdrawal shares must be greater than zero');
  }
}
