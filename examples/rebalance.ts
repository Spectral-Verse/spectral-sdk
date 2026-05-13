import { SpectraClient, TOTAL_BPS } from '../src';

const client = new SpectraClient({
  rpcUrl: 'https://soroban-testnet.stellar.org',
  networkPassphrase: 'Test SDF Network ; September 2015',
  contractId: 'CA...',
});

async function main() {
  const vaultId = '0'.repeat(64);
  const rebalanceAuth = 'GB...';

  const newAllocations = [
    { asset: 'CC...', targetBps: 6000 },
    { asset: 'CD...', targetBps: 4000 },
  ];

  // const tx = await client.buildRebalanceTransaction(vaultId, rebalanceAuth, newAllocations);
  console.log('Building rebalance transaction...');
}

main().catch(console.error);
