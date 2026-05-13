# Error Handling

The SDK uses a custom `SpectraError` class with structured error codes to help developers handle issues gracefully.

## Error Codes

- **INVALID_CONFIGURATION**: Provided client configuration is incomplete or invalid.
- **INVALID_ADDRESS**: A provided Stellar address is malformed.
- **INVALID_CONTRACT_ID**: A provided Soroban contract ID is malformed.
- **INVALID_ALLOCATION**: Allocation targets do not total 10,000 bps.
- **DUPLICATE_ASSET**: Multiple allocations for the same asset.
- **RPC_FAILURE**: The Soroban RPC endpoint returned an error or is unreachable.
- **SIMULATION_FAILURE**: The transaction simulation failed (e.g., due to logic errors or insufficient funds).
- **TRANSACTION_FAILURE**: The transaction was rejected by the network after submission.

## Example

```typescript
try {
  await client.getVault(invalidId);
} catch (err) {
  if (err instanceof SpectraError && err.code === SpectraErrorCode.INVALID_CONTRACT_ID) {
    console.error('The vault ID is invalid');
  }
}
```
