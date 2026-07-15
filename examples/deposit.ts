import { SpectralClient, toStroops } from '../src';

const client = new SpectralClient({
  rpcUrl: 'https://soroban-testnet.stellar.org',
  networkPassphrase: 'Test SDF Network ; September 2015',
  contractId: 'CA...',
});

async function main() {
  const vaultId = '0'.repeat(64);
  const user = 'GC...';
  const asset = 'CC...';
  const amount = toStroops('100.0');

  const tx = await client.buildDepositTransaction(vaultId, user, asset, amount);
  console.log('Transaction XDR:', tx.toXDR());
  console.log('Please sign this transaction with your wallet.');
}

main().catch(console.error);
