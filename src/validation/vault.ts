import { isValidAddress, isValidContractId } from '../utils/address';
import { SpectralError } from '../errors/SpectralError';
import { SpectralErrorCode } from '../errors/errorCodes';
import { isValidHash } from '../utils/hash';

export function validateVaultId(vaultId: string): void {
  if (!isValidHash(vaultId)) {
    throw new SpectralError(SpectralErrorCode.INVALID_CONTRACT_ID, `Invalid vault ID: ${vaultId}`);
  }
}

export function validateVaultConfig(config: any): void {
  if (!config.name || typeof config.name !== 'string') {
    throw new SpectralError(SpectralErrorCode.INSUFFICIENT_DATA, 'Vault name is required');
  }
  if (!isValidAddress(config.manager)) {
    throw new SpectralError(SpectralErrorCode.INVALID_ADDRESS, 'Invalid manager address');
  }
  // Additional config validations...
}
