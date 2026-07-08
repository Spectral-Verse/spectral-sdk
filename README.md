# Spectral SDK

Spectral SDK is a comprehensive TypeScript library designed for seamless integration with Spectral Verse Contracts—a suite of Soroban smart contracts for transparent on-chain asset basket vaults on the Stellar network.

## Key Features

- **Typed Contract Clients**: High-level abstractions for interacting with Spectral Verse vaults with full type safety.
- **Advanced Transaction Builders**: Streamlined utilities for preparing complex vault operations including deposits, withdrawals, and rebalances.
- **Robust Data Parsers**: Reliable conversion of raw contract values and ledger events into structured, developer-friendly models.
- **Integrated Validation**: Built-in logic for verifying addresses, asset allocations, and operational parameters before execution.
- **Developer Experience**: Includes a `MockSpectralClient` for rapid, deterministic testing and local development workflows.

## Installation

```bash
npm install @spectra/sdk
```

## Quick Start

```typescript
import { SpectralClient, NetworkNames } from '@spectra/sdk';

const client = new SpectralClient({
  rpcUrl: 'https://soroban-testnet.stellar.org',
  networkPassphrase: NetworkNames.TESTNET,
  contractId: 'CA...',
});

// List all vaults
const vaults = await client.listVaults();

// Get a user's position in a vault
const position = await client.getUserPosition(vaultId, userAddress);
```

## Documentation

- [Architecture](docs/architecture.md)
- [Contract Mapping](docs/contract-mapping.md)
- [Error Handling](docs/error-handling.md)
- [Browser Usage](docs/browser-usage.md)
- [API Reference](docs/api/index.html) (Run `npm run docs` to generate)

## Security

Spectral SDK is open-source and follows security best practices. However, it has not been formally audited.

**Warning**: Do not rely on the SDK alone for high-value transactions without independent review. See [SECURITY.md](SECURITY.md) for more details.


## License

MIT
