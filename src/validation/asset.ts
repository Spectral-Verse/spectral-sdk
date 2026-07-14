import { isValidAddress, isValidContractId } from '../utils/address';
import { SpectralError } from '../errors/SpectralError';
import { SpectralErrorCode } from '../errors/errorCodes';

export function validateAsset(asset: string): void {
  if (!isValidAddress(asset) && !isValidContractId(asset)) {
    throw new SpectralError(
      SpectralErrorCode.INVALID_ADDRESS,
      `Invalid asset identifier: ${asset}`
    );
  }
}
