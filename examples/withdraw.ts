import { SpectralClient, toStroops } from '../src';

const client = new SpectralClient({
  rpcUrl: 'https://soroban-testnet.stellar.org',
  networkPassphrase: 'Test SDF Network ; September 2015',
  contractId: 'CA...',
});

async function main() {
  const vaultId = '0'.repeat(64);
  const user = 'GC...';
  const shares = toStroops('50.0');

  // const tx = await client.buildWithdrawalTransaction(vaultId, user, shares);
  console.log('Building withdrawal transaction...');
}

main().catch(console.error);
