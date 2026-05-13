import { xdr, scValToNative } from '@stellar/stellar-sdk';
import { SpectraError } from '../errors/SpectraError';
import { SpectraErrorCode } from '../errors/errorCodes';

export interface SpectraEvent {
  type: string;
  vaultId: string;
  data: any;
}

export function parseSpectraEvent(event: any): SpectraEvent {
  try {
    const topics = event.topic.map((t: string) => scValToNative(xdr.ScVal.fromXDR(t, 'base64')));
    const data = scValToNative(xdr.ScVal.fromXDR(event.value, 'base64'));

    if (topics[0] !== 'vault') {
      throw new Error('Not a Spectra vault event');
    }

    return {
      type: topics[1],
      vaultId: topics[2],
      data,
    };
  } catch (err) {
    throw new SpectraError(
      SpectraErrorCode.UNKNOWN_CONTRACT_EVENT,
      'Failed to parse contract event',
      err
    );
  }
}
