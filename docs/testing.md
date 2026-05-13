# Testing

Spectra SDK uses Vitest for unit and mock testing.

## Running Tests

```bash
npm test
```

## Unit Tests

Located in `tests/`, these tests cover:
- Validation logic
- Amount formatting and conversion
- Event parsing
- Client configuration

## Mock Client Tests

The `MockSpectraClient` allows testing application logic without a live RPC connection. It uses fixtures defined in `src/mocks/fixtures.ts`.

## Integration Testing

To run integration tests against a live network:
1. Copy `.env.example` to `.env`.
2. Provide a valid `RPC_URL`, `NETWORK_PASSPHRASE`, and `CONTRACT_ID`.
3. Run `npm run test:integration` (if implemented).

## Adding Fixtures

When adding new contract functionality, ensure you update `fixtures.ts` and `MockSpectraClient.ts` to reflect the new state and methods.
