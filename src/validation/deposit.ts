import { SpectraError } from '../errors/SpectraError';
import { SpectraErrorCode } from '../errors/errorCodes';

export function validateDepositAmount(amount: bigint): void {
  if (amount <= 0n) {
    throw new SpectraError(SpectraErrorCode.ZERO_AMOUNT, 'Deposit amount must be greater than zero');
  }
}
