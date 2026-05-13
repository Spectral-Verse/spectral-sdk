import { Vault, VaultStatus } from '../models/vault';
import { UserPosition } from '../models/position';

export const MOCK_VAULT_ID = '0'.repeat(64);
export const MOCK_MANAGER = 'GB'.padEnd(56, '0');
export const MOCK_USER = 'GC'.padEnd(56, '0');
export const MOCK_ASSET_A = 'CD'.padEnd(56, '0');
export const MOCK_ASSET_B = 'CE'.padEnd(56, '0');

export const mockVault: Vault = {
  id: MOCK_VAULT_ID,
  config: {
    name: 'Mock Strategy',
    metadataHash: MOCK_VAULT_ID,
    manager: MOCK_MANAGER,
    baseAsset: MOCK_ASSET_A,
    rebalanceAuthority: MOCK_MANAGER,
    managementFeeBps: 100,
    depositStatus: VaultStatus.ACTIVE,
    withdrawalStatus: VaultStatus.ACTIVE,
  },
  allocations: [
    { asset: MOCK_ASSET_A, targetBps: 5000 },
    { asset: MOCK_ASSET_B, targetBps: 5000 },
  ],
  totalShares: 1000000000n,
  formattedTotalShares: '100.0000000',
};

export const mockPosition: UserPosition = {
  vaultId: MOCK_VAULT_ID,
  userAddress: MOCK_USER,
  shares: 500000000n,
  formattedShares: '50.0000000',
  sharePercentage: 50,
};
