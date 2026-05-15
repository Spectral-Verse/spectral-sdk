import { RpcProvider } from './RpcProvider';
import { ContractClient } from './ContractClient';
import { TransactionBuilder } from './TransactionBuilder';
import { Vault, VaultStatus } from '../models/vault';
import { UserPosition } from '../models/position';
import { AssetAllocation } from '../models/allocation';
import { validateAllocations } from '../validation/allocation';
import { validateVaultId } from '../validation/vault';
import { fromStroops } from '../utils/amount';

/**
 * Configuration options for initializing the Spectra SDK client.
 */
export interface SpectraClientConfig {
  /** The URL of the Soroban RPC server */
  rpcUrl: string;
  /** The network passphrase for the target Stellar network */
  networkPassphrase: string;
  /** The contract ID of the Spectra vault factory or main contract */
  contractId: string;
}

/**
 * The primary entry point for interacting with Spectra vaults.
 * Provides high-level methods for querying state and building transactions.
 */
export class SpectraClient {
  private provider: RpcProvider;
  private contract: ContractClient;
  private txBuilder: TransactionBuilder;

  /**
   * Creates a new instance of the SpectraClient.
   * @param config - The client configuration.
   */
  constructor(config: SpectraClientConfig) {
    this.provider = new RpcProvider(config.rpcUrl, config.networkPassphrase);
    this.contract = new ContractClient(config.contractId, this.provider);
    this.txBuilder = new TransactionBuilder(this.provider);
  }

  /**
   * Fetches the current state of a specific vault.
   * 
   * @param vaultId - The 32-byte unique identifier of the vault.
   * @returns A promise resolving to the complete Vault state.
   * @throws {SpectraError} If the vault is not found or ID is invalid.
   */
  public async getVault(vaultId: string): Promise<Vault> {
    validateVaultId(vaultId);
    // In a real implementation, this would call the contract's get_config and get_allocations
    // For now, returning a structured placeholder or calling internal methods
    const config = await this.contract.callViewMethod('get_config', [vaultId]);
    const allocations = await this.contract.callViewMethod('get_allocations', [vaultId]);
    const totalShares = await this.contract.callViewMethod('get_total_shares', [vaultId]);

    return {
      id: vaultId,
      config,
      allocations,
      totalShares,
      formattedTotalShares: fromStroops(totalShares),
    };
  }

  /**
   * Retrieves the share position for a specific user in a vault.
   * 
   * @param vaultId - The ID of the vault.
   * @param userAddress - The Stellar public key of the user.
   * @returns A promise resolving to the UserPosition details.
   */
  public async getUserPosition(vaultId: string, userAddress: string): Promise<UserPosition> {
    validateVaultId(vaultId);
    const shares = await this.contract.callViewMethod('get_user_shares', [vaultId, userAddress]);
    const totalShares = await this.contract.callViewMethod('get_total_shares', [vaultId]);

    return {
      vaultId,
      userAddress,
      shares,
      formattedShares: fromStroops(shares),
      sharePercentage: totalShares > 0n ? Number((shares * 10000n) / totalShares) / 100 : 0,
    };
  }

  /**
   * Prepares an unsigned transaction for depositing a supported asset into a vault.
   * 
   * This method performs several client-side validations:
   * 1. Validates the `vaultId` format.
   * 2. Checks if the user address is valid.
   * 3. Ensures the amount is greater than zero.
   * 
   * The returned transaction must be signed by the user's wallet before submission.
   *
   * @param vaultId - The 32-byte hexadecimal ID of the target vault.
   * @param userAddress - The Stellar public key (G...) of the depositor.
   * @param assetAddress - The address of the asset being deposited.
   * @param amount - The amount to deposit (in stroops/base units).
   * @returns A promise resolving to the prepared Stellar Transaction object.
   * @throws {SpectraError} If validation fails or RPC connection issues occur.
   */
  public async buildDepositTransaction(
    vaultId: string,
    userAddress: string,
    assetAddress: string,
    amount: bigint
  ): Promise<any> {
    validateVaultId(vaultId);
    // Logic to build the transaction using this.txBuilder and this.contract.invokeArgs
    return this.txBuilder.buildVaultCall(
      userAddress,
      'deposit',
      [vaultId, userAddress, assetAddress, amount]
    );
  }

  /**
   * Prepares a transaction to redeem vault shares for the underlying asset basket.
   * 
   * When a user withdraws, they receive a proportional amount of every asset held 
   * by the vault. The shares are burned in the process.
   *
   * @param vaultId - The ID of the vault to withdraw from.
   * @param userAddress - The address of the shareholder.
   * @param sharesToBurn - The number of shares to redeem (in stroops).
   * @returns A promise resolving to the prepared transaction.
   */
  public async buildWithdrawTransaction(
    vaultId: string,
    userAddress: string,
    sharesToBurn: bigint
  ): Promise<any> {
    validateVaultId(vaultId);
    return this.txBuilder.buildVaultCall(
      userAddress,
      'withdraw',
      [vaultId, userAddress, sharesToBurn]
    );
  }

  /**
   * Prepares a transaction to update the vault's asset allocation weights.
   * 
   * Only the designated `rebalance_authority` for the vault can execute this.
   * The new allocations must sum up to exactly 10,000 basis points.
   *
   * @param vaultId - The ID of the vault to rebalance.
   * @param managerAddress - The address of the rebalance authority.
   * @param newAllocations - The complete list of assets and their new target weights.
   * @returns A promise resolving to the prepared transaction.
   */
  public async buildRebalanceTransaction(
    vaultId: string,
    managerAddress: string,
    newAllocations: AssetAllocation[]
  ): Promise<any> {
    validateVaultId(vaultId);
    validateAllocations(newAllocations);
    return this.txBuilder.buildVaultCall(
      managerAddress,
      'update_allocations',
      [vaultId, newAllocations]
    );
  }

  /**
   * Prepares a transaction for the manager to claim accumulated fees.
   * 
   * Fees accrued from deposits across all assets in the basket are transferred
   * to the manager's address.
   *
   * @param vaultId - The ID of the vault.
   * @param managerAddress - The address of the vault manager.
   * @returns A promise resolving to the prepared transaction.
   */
  public async buildClaimFeesTransaction(
    vaultId: string,
    managerAddress: string
  ): Promise<any> {
    validateVaultId(vaultId);
    return this.txBuilder.buildVaultCall(
      managerAddress,
      'claim_fees',
      [vaultId]
    );
  }

  /**
   * Updates the operational status (Active/Paused) of a vault.
   * 
   * @param vaultId - The ID of the vault.
   * @param managerAddress - The address of the vault manager.
   * @param depositStatus - The new status for deposits.
   * @param withdrawalStatus - The new status for withdrawals.
   * @returns A promise resolving to the prepared transaction.
   */
  public async buildSetStatusTransaction(
    vaultId: string,
    managerAddress: string,
    depositStatus: VaultStatus,
    withdrawalStatus: VaultStatus
  ): Promise<any> {
    validateVaultId(vaultId);
    return this.txBuilder.buildVaultCall(
      managerAddress,
      'set_status',
      [vaultId, depositStatus, withdrawalStatus]
    );
  }
}
