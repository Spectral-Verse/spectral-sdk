import { SorobanRpc, Transaction, Network, xdr, TransactionBuilder as StellarTransactionBuilder } from '@stellar/stellar-sdk';
import { SpectraError } from '../errors/SpectraError';
import { SpectraErrorCode } from '../errors/errorCodes';

/**
 * A wrapper around the Stellar Soroban RPC server providing high-level utility methods.
 * Handles network-specific details like passphrase and transaction status polling.
 */
export class RpcProvider {
  private server: SorobanRpc.Server;
  private networkPassphrase: string;

  /**
   * Initializes the RpcProvider.
   * @param rpcUrl - The Soroban RPC endpoint URL.
   * @param networkPassphrase - The network passphrase (e.g., for Testnet or Mainnet).
   */
  constructor(rpcUrl: string, networkPassphrase: string) {
    this.server = new SorobanRpc.Server(rpcUrl);
    this.networkPassphrase = networkPassphrase;
  }

  /**
   * Retrieves account information including sequence number.
   * @param address - The Stellar address to fetch.
   * @returns Soroban RPC account response.
   * @throws {SpectraError} If the RPC request fails.
   */
  public async getAccount(address: string): Promise<SorobanRpc.Api.GetAccountResponse> {
    try {
      return await this.server.getAccount(address);
    } catch (err) {
      throw SpectraError.fromRpcError(err);
    }
  }

  /**
   * Simulates a transaction to estimate resource usage and fees.
   * @param tx - The transaction to simulate.
   * @returns Simulation result including resource estimates.
   */
  public async simulateTransaction(tx: Transaction): Promise<SorobanRpc.Api.SimulateTransactionResponse> {
    try {
      return await this.server.simulateTransaction(tx);
    } catch (err) {
      throw SpectraError.fromRpcError(err);
    }
  }

  /**
   * Submits a signed transaction to the network.
   * @param tx - The signed transaction object.
   * @returns Submission response from the RPC.
   */
  public async sendTransaction(tx: Transaction): Promise<SorobanRpc.Api.SendTransactionResponse> {
    try {
      return await this.server.sendTransaction(tx);
    } catch (err) {
      throw SpectraError.fromRpcError(err);
    }
  }

  /**
   * Fetches the status and result of a previously submitted transaction.
   * @param hash - The transaction hash.
   * @returns Transaction details if found.
   */
  public async getTransaction(hash: string): Promise<SorobanRpc.Api.GetTransactionResponse> {
    try {
      return await this.server.getTransaction(hash);
    } catch (err) {
      throw SpectraError.fromRpcError(err);
    }
  }

  /**
   * Returns the configured network passphrase.
   */
  public getNetworkPassphrase(): string {
    return this.networkPassphrase;
  }
}
