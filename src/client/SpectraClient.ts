import { RpcProvider } from './RpcProvider';
import { ContractClient } from './ContractClient';
import { TransactionBuilder } from './TransactionBuilder';
import { Vault, VaultStatus } from '../models/vault';
import { UserPosition } from '../models/position';
import { AssetAllocation } from '../models/allocation';
import { validateAllocations } from '../validation/allocation';
import { validateVaultId } from '../validation/vault';
import { fromStroops } from '../utils/amount';

export interface SpectraClientConfig {
  rpcUrl: string;
  networkPassphrase: string;
  contractId: string;
}

export class SpectraClient {
  private provider: RpcProvider;
  private contract: ContractClient;
  private txBuilder: TransactionBuilder;

  constructor(config: SpectraClientConfig) {
    this.provider = new RpcProvider(config.rpcUrl, config.networkPassphrase);
    this.contract = new ContractClient(config.contractId, this.provider);
    this.txBuilder = new TransactionBuilder(this.provider);
  }

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

  public async buildDepositTransaction(
    vaultId: string,
    userAddress: string,
    assetAddress: string,
    amount: bigint
  ) {
    const op = this.contract.prepareInvoke('deposit', [vaultId, userAddress, assetAddress, amount]);
    return this.txBuilder.build(userAddress, op);
  }

  // ... other methods like buildWithdrawalTransaction, listVaults, etc.
}
