import { AssetAllocation } from './allocation';

export enum VaultStatus {
  ACTIVE = 'Active',
  PAUSED = 'Paused',
}

export interface VaultConfig {
  name: string;
  metadataHash: string;
  manager: string;
  baseAsset: string;
  rebalanceAuthority: string;
  managementFeeBps: number;
  depositStatus: VaultStatus;
  withdrawalStatus: VaultStatus;
}

export interface Vault {
  id: string;
  config: VaultConfig;
  allocations: AssetAllocation[];
  totalShares: bigint;
  formattedTotalShares: string;
}
