import { SpectraClient, NetworkNames } from '../src';

const client = new SpectraClient({
  rpcUrl: process.env.RPC_URL || 'https://soroban-testnet.stellar.org',
  networkPassphrase: process.env.NETWORK_PASSPHRASE || NetworkNames.TESTNET,
  contractId: process.env.CONTRACT_ID || 'CA...',
});

async function main() {
  const vaultId = '0'.repeat(64);
  const manager = 'GB...';
  const baseAsset = 'CC...';
  const rebalanceAuth = 'GB...';

  const allocations = [
    { asset: baseAsset, targetBps: 10000 },
  ];

  // This would typically be called by a strategy creator
  // const tx = await client.buildCreateVaultTransaction(...);
  console.log('Building create vault transaction...');
}

main().catch(console.error);
