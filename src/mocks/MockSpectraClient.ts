import { SpectraClient, SpectraClientConfig } from '../client/SpectraClient';
import { Vault } from '../models/vault';
import { UserPosition } from '../models/position';
import { mockVault, mockPosition } from './fixtures';

export class MockSpectraClient extends SpectraClient {
  constructor(config: Partial<SpectraClientConfig> = {}) {
    super({
      rpcUrl: 'http://localhost:8000',
      networkPassphrase: 'Test SDF Network ; September 2015',
      contractId: 'C'.repeat(56),
      ...config,
    });
  }

  public override async getVault(vaultId: string): Promise<Vault> {
    if (vaultId === mockVault.id) {
      return mockVault;
    }
    throw new Error('Vault not found in mocks');
  }

  public override async getUserPosition(vaultId: string, userAddress: string): Promise<UserPosition> {
    if (vaultId === mockPosition.vaultId && userAddress === mockPosition.userAddress) {
      return mockPosition;
    }
    return {
      vaultId,
      userAddress,
      shares: 0n,
      formattedShares: '0.0000000',
      sharePercentage: 0,
    };
  }

  public async listVaults(): Promise<Vault[]> {
    return [mockVault];
  }
}
