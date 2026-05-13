import { SorobanRpc, Transaction, Network, xdr, TransactionBuilder as StellarTransactionBuilder } from '@stellar/stellar-sdk';
import { SpectraError } from '../errors/SpectraError';
import { SpectraErrorCode } from '../errors/errorCodes';

export class RpcProvider {
  private server: SorobanRpc.Server;
  private networkPassphrase: string;

  constructor(rpcUrl: string, networkPassphrase: string) {
    this.server = new SorobanRpc.Server(rpcUrl);
    this.networkPassphrase = networkPassphrase;
  }

  public async getAccount(address: string): Promise<SorobanRpc.Api.GetAccountResponse> {
    try {
      return await this.server.getAccount(address);
    } catch (err) {
      throw SpectraError.fromRpcError(err);
    }
  }

  public async simulateTransaction(tx: Transaction): Promise<SorobanRpc.Api.SimulateTransactionResponse> {
    try {
      return await this.server.simulateTransaction(tx);
    } catch (err) {
      throw SpectraError.fromRpcError(err);
    }
  }

  public async sendTransaction(tx: Transaction): Promise<SorobanRpc.Api.SendTransactionResponse> {
    try {
      return await this.server.sendTransaction(tx);
    } catch (err) {
      throw SpectraError.fromRpcError(err);
    }
  }

  public async getTransaction(hash: string): Promise<SorobanRpc.Api.GetTransactionResponse> {
    try {
      return await this.server.getTransaction(hash);
    } catch (err) {
      throw SpectraError.fromRpcError(err);
    }
  }

  public getNetworkPassphrase(): string {
    return this.networkPassphrase;
  }
}
