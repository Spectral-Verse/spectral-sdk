import { isValidAddress, isValidContractId } from '../utils/address';
import { SpectraError } from '../errors/SpectraError';
import { SpectraErrorCode } from '../errors/errorCodes';
import { isValidHash } from '../utils/hash';

export function validateVaultId(vaultId: string): void {
  if (!isValidHash(vaultId)) {
    throw new SpectraError(SpectraErrorCode.INVALID_CONTRACT_ID, `Invalid vault ID: ${vaultId}`);
  }
}

export function validateVaultConfig(config: any): void {
  if (!config.name || typeof config.name !== 'string') {
    throw new SpectraError(SpectraErrorCode.INSUFFICIENT_DATA, 'Vault name is required');
  }
  if (!isValidAddress(config.manager)) {
    throw new SpectraError(SpectraErrorCode.INVALID_ADDRESS, 'Invalid manager address');
  }
  // Additional config validations...
}
