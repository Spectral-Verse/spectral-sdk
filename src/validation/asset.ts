import { isValidAddress, isValidContractId } from '../utils/address';
import { SpectraError } from '../errors/SpectraError';
import { SpectraErrorCode } from '../errors/errorCodes';

export function validateAsset(asset: string): void {
  if (!isValidAddress(asset) && !isValidContractId(asset)) {
    throw new SpectraError(SpectraErrorCode.INVALID_ADDRESS, `Invalid asset identifier: ${asset}`);
  }
}
