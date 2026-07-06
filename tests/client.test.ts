import { describe, it, expect } from 'vitest';
import { SpectralClient, NetworkNames } from '../src';

describe('SpectralClient', () => {
  const config = {
    rpcUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: NetworkNames.TESTNET,
    contractId: 'C'.repeat(56),
  };

  it('should initialize with correct configuration', () => {
    const client = new SpectralClient(config);
    expect(client).toBeDefined();
  });
});
