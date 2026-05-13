import { scValToNative, xdr } from '@stellar/stellar-sdk';

export function parseContractValue(val: string | xdr.ScVal): any {
  if (typeof val === 'string') {
    return scValToNative(xdr.ScVal.fromXDR(val, 'base64'));
  }
  return scValToNative(val);
}
