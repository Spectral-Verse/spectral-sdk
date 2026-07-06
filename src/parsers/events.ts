import { xdr, scValToNative } from '@stellar/stellar-sdk';
import { SpectralError } from '../errors/SpectralError';
import { SpectralErrorCode } from '../errors/errorCodes';

export interface SpectralEvent {
  type: string;
  vaultId: string;
  data: any;
}

export function parseSpectralEvent(event: any): SpectralEvent {
  try {
    const topics = event.topic.map((t: string) => scValToNative(xdr.ScVal.fromXDR(t, 'base64')));
    const data = scValToNative(xdr.ScVal.fromXDR(event.value, 'base64'));

    if (topics[0] !== 'vault') {
      throw new Error('Not a Spectral vault event');
    }

    return {
      type: topics[1],
      vaultId: topics[2],
      data,
    };
  } catch (err) {
    throw new SpectralError(
      SpectralErrorCode.UNKNOWN_CONTRACT_EVENT,
      'Failed to parse contract event',
      err
    );
  }
}
