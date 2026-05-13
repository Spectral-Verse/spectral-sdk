import { StrKey } from '@stellar/stellar-sdk';

export function isValidAddress(address: string): boolean {
  try {
    return StrKey.isValidEd25519PublicKey(address);
  } catch {
    return false;
  }
}

export function isValidContractId(contractId: string): boolean {
  try {
    return StrKey.isValidContract(contractId);
  } catch {
    return false;
  }
}
