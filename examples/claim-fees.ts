import { SpectraClient } from '../src';

const client = new SpectraClient({
  rpcUrl: 'https://soroban-testnet.stellar.org',
  networkPassphrase: 'Test SDF Network ; September 2015',
  contractId: 'CA...',
});

async function main() {
  const vaultId = '0'.repeat(64);
  const manager = 'GB...';

  // const tx = await client.buildClaimFeesTransaction(vaultId, manager);
  console.log('Building claim fees transaction...');
}

main().catch(console.error);
