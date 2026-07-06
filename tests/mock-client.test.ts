import { describe, it, expect } from 'vitest';
import { MockSpectralClient, mockVault, mockPosition } from '../src';

describe('MockSpectralClient', () => {
  const client = new MockSpectralClient();

  it('should return mock vault data', async () => {
    const vault = await client.getVault(mockVault.id);
    expect(vault).toEqual(mockVault);
  });

  it('should return mock user position', async () => {
    const position = await client.getUserPosition(mockPosition.vaultId, mockPosition.userAddress);
    expect(position).toEqual(mockPosition);
  });

  it('should list mock vaults', async () => {
    const vaults = await client.listVaults();
    expect(vaults).toHaveLength(1);
    expect(vaults[0]).toEqual(mockVault);
  });
});
