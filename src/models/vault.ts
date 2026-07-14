import { AssetAllocation } from './allocation';

/**
 * Represents the operational status of a Spectra vault.
 *
 * This status determines whether users can interact with the vault's core
 * functions (deposit and withdrawal).
 */
export enum VaultStatus {
  /** Vault is fully active and accepting all transactions. */
  ACTIVE = 'Active',
  /** Vault operations are temporarily suspended by the manager. */
  PAUSED = 'Paused',
}

/**
 * Core configuration and permission settings for a Spectra vault.
 *
 * These settings are defined at vault creation and can be updated by
 * authorized parties (Manager or Rebalance Authority).
 */
export interface VaultConfig {
  /** The human-readable name of the vault (e.g., "Spectra Blue Chip Index"). */
  name: string;
  /**
   * A 32-byte hexadecimal hash of off-chain strategy metadata.
   * This provides a verifiable link to external strategy documentation.
   */
  metadataHash: string;
  /** The Stellar address (G...) of the vault manager with administrative control. */
  manager: string;
  /**
   * The contract address of the primary asset used for valuation.
   * All shares are valued relative to this asset.
   */
  baseAsset: string;
  /**
   * The address permitted to update asset allocations.
   * Usually a specialized rebalancing contract or a multi-sig.
   */
  rebalanceAuthority: string;
  /**
   * Management fee charged on deposits, in basis points (bps).
   * 1 bps = 0.01%. 100 bps = 1.00%.
   */
  managementFeeBps: number;
  /** Current operational status for new deposits into the vault. */
  depositStatus: VaultStatus;
  /** Current operational status for share redemptions. */
  withdrawalStatus: VaultStatus;
}

/**
 * Represents the complete, aggregated state of a Spectra vault.
 *
 * This model combines configuration, current allocations, and total supply
 * data into a single object for ease of use in applications.
 */
export interface Vault {
  /** The unique 32-byte hexadecimal identifier of the vault. */
  id: string;
  /** The vault's static and dynamic configuration parameters. */
  config: VaultConfig;
  /** The current target composition of assets within the vault's basket. */
  allocations: AssetAllocation[];
  /**
   * Total number of shares currently issued by the vault (in stroops).
   * Represented as a bigint for maximum precision.
   */
  totalShares: bigint;
  /**
   * Total shares formatted as a human-readable decimal string.
   * Useful for UI display (e.g., "1,250.50").
   */
  formattedTotalShares: string;
}
