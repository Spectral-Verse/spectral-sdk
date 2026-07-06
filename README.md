# Spectral SDK

Spectral SDK is a comprehensive TypeScript library designed for seamless integration with Spectral Verse Contracts—a suite of Soroban smart contracts for transparent on-chain asset basket vaults on the Stellar network.

## Key Features

- **Typed Contract Clients**: High-level abstractions for interacting with Spectral Verse vaults with full type safety.
- **Advanced Transaction Builders**: Streamlined utilities for preparing complex vault operations including deposits, withdrawals, and rebalances.
- **Robust Data Parsers**: Reliable conversion of raw contract values and ledger events into structured, developer-friendly models.
- **Integrated Validation**: Built-in logic for verifying addresses, asset allocations, and operational parameters before execution.
- **Developer Experience**: Includes a `MockSpectraClient` for rapid, deterministic testing and local development workflows.

## Installation

```bash
npm install @spectra/sdk
```

## Quick Start

```typescript
import { SpectraClient, NetworkNames } from '@spectra/sdk';

const client = new SpectraClient({
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

## Funding and Drips

This repository is intended to be eligible for [Drips](https://www.drips.network/) funding and participation in [Drips Wave](https://docs.drips.network/wave/) contribution cycles. 

### Maintainer Action Required
To fully enable Drips funding and repository claiming, maintainers must:
1. Claim the repository on [Drips App](https://www.drips.network/app)
2. Configure funding splits (if applicable)
3. Consider adding a `FUNDING.json` file with approved ownership details (no placeholder addresses should be used)
4. Review and apply appropriate labels (see `.github/ISSUE_TEMPLATE/` for label suggestions)

For more information, see [docs/drips-readiness.md](docs/drips-readiness.md).

## License

MIT
