# Browser Usage

Spectra SDK is compatible with modern browsers.

## Bundling

The SDK is published as an ESM module. If you are using a bundler like Vite, Webpack, or Esbuild, it should work out of the box.

## Wallet Integration

Since the SDK does not handle private keys, you must integrate with a browser wallet (e.g., Freighter, Albedo) to sign transactions.

```typescript
import { SpectraClient } from '@spectra/sdk';

const client = new SpectraClient({ ... });

// 1. Build the transaction
const tx = await client.buildDepositTransaction(...);

// 2. Sign with a wallet (e.g., Freighter)
const signedXdr = await window.stellarKeypair.signTransaction(tx.toXDR());

// 3. Submit
const result = await client.submitTransaction(signedXdr);
```

## Considerations

- Ensure your RPC endpoint is accessible via CORS from the browser.
- Use the `MockSpectraClient` for frontend development without a live network.
