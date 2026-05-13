import { SpectraClient, NetworkNames } from '@spectra/sdk';

// This example demonstrates how to use the SDK in a browser context with Freighter
async function depositWithFreighter() {
  const client = new SpectraClient({
    rpcUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: NetworkNames.TESTNET,
    contractId: 'CA...',
  });

  const vaultId = '0'.repeat(64);
  const user = 'GC...'; // Get this from Freighter
  const asset = 'CC...';
  const amount = 1000000000n; // 100.0 tokens

  // 1. Build the transaction
  const tx = await client.buildDepositTransaction(vaultId, user, asset, amount);

  // 2. Sign with Freighter (Conceptual)
  // const signedXdr = await window.freighter.signTransaction(tx.toXDR());

  // 3. Submit the transaction
  // const result = await client.submitTransaction(signedXdr);
  console.log('Built transaction for browser signing');
}

depositWithFreighter().catch(console.error);
