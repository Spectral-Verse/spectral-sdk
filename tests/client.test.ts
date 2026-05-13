import { describe, it, expect } from 'vitest';
import { SpectraClient, NetworkNames } from '../src';

describe('SpectraClient', () => {
  const config = {
    rpcUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: NetworkNames.TESTNET,
    contractId: 'C'.repeat(56),
  };

  it('should initialize with correct configuration', () => {
    const client = new SpectraClient(config);
    expect(client).toBeDefined();
  });
});
