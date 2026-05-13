import { TransactionBuilder as StellarTransactionBuilder, Account, xdr, BASE_FEE } from '@stellar/stellar-sdk';
import { RpcProvider } from './RpcProvider';

export class TransactionBuilder {
  private provider: RpcProvider;

  constructor(provider: RpcProvider) {
    this.provider = provider;
  }

  public async build(sourceAddress: string, operation: xdr.Operation): Promise<any> {
    const accountResponse = await this.provider.getAccount(sourceAddress);
    const account = new Account(sourceAddress, accountResponse.sequence);

    const tx = new StellarTransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: this.provider.getNetworkPassphrase(),
    })
      .addOperation(operation)
      .setTimeout(30)
      .build();

    return tx;
  }
}
