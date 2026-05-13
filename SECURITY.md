# Security Policy

## Responsible Disclosure

If you find a security vulnerability, please report it to the Spectra maintainers. We appreciate your help in keeping the ecosystem safe.

## Transaction Signing

The Spectra SDK **does not store private keys**. It is designed to build and prepare transactions that must be signed externally (e.g., via a wallet extension, a KMS, or a local secret key).

## RPC Trust Assumptions

The SDK relies on the provided Soroban RPC endpoint for simulating and sending transactions. Ensure you use a trusted RPC provider.

## Contract Interaction Risks

Interacting with smart contracts involves inherent risks. Always verify transaction details before signing.

**DO NOT use this SDK for high-value funds without independent review.**
