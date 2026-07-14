import {
  TransactionBuilder as StellarTransactionBuilder,
  Account,
  xdr,
  BASE_FEE,
  Transaction,
} from '@stellar/stellar-sdk';
import { RpcProvider } from './RpcProvider';

/**
 * Logic for assembling Stellar transactions from contract operations.
 * Handles account sequence fetching and default fee management.
 */
export class TransactionBuilder {
  private provider: RpcProvider;

  /**
   * Initializes the TransactionBuilder.
   * @param provider - The RPC provider instance to use for fetching account data.
   */
  constructor(provider: RpcProvider) {
    this.provider = provider;
  }

  /**
   * Assembles a Stellar transaction for a given contract operation.
   *
   * @param sourceAddress - The Stellar address of the transaction source account.
   * @param operation - The XDR operation (e.g., contract invocation) to include.
   * @returns A promise resolving to the built Transaction object.
   */
  public async build(sourceAddress: string, operation: xdr.Operation): Promise<Transaction> {
    // Fetch the latest account sequence from the network
    const accountResponse = await this.provider.getAccount(sourceAddress);
    const account = new Account(sourceAddress, accountResponse.sequenceNumber());

    // Build the transaction with default conservative settings
    const tx = new StellarTransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: this.provider.getNetworkPassphrase(),
    })
      .addOperation(operation)
      .setTimeout(30) // 30 second timeout for ledger submission
      .build();

    return tx;
  }
}
