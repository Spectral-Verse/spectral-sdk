# SDK Architecture

Spectra SDK is structured into several layers to provide both high-level convenience and low-level control.

## Layers

1.  **SpectraClient**: The primary entry point for developers. It provides typed methods for common workflows like getting vault data, user positions, and building transactions.
2.  **ContractClient**: A lower-level abstraction that handles direct Soroban contract invocations, including simulations and operation preparation.
3.  **RpcProvider**: Wraps the Stellar Soroban RPC interactions, handling simulation, transaction submission, and status polling.
4.  **TransactionBuilder**: Logic for assembling Stellar transactions from contract operations, including fee and sequence number handling.

## Transaction Flow

1.  **Preparation**: The SDK prepares a contract invocation operation.
2.  **Building**: The `TransactionBuilder` fetches account details and wraps the operation in a transaction.
3.  **Simulation**: The `RpcProvider` simulates the transaction to estimate resources and fees.
4.  **Signing (External)**: The transaction is returned to the caller for signing.
5.  **Submission**: The signed transaction is sent back to the SDK (or directly to RPC) for submission to the network.

## Why External Signing?

To maximize security, the SDK does not handle private keys. This allows it to be used in both backend environments (where a KMS or secret key might be used) and frontend environments (where a wallet extension handles signing).
