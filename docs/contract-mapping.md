# Contract Mapping

This document maps Spectral SDK methods to the underlying Spectral Verse contract functions.

| SDK Method | Contract Function | Notes |
| :--- | :--- | :--- |
| `getVault(id)` | `get_config`, `get_allocations` | Aggregates multiple contract reads. |
| `getUserPosition(vId, user)` | `get_user_shares`, `get_total_shares` | Calculates share percentage. |
| `buildDepositTransaction(...)` | `deposit` | Returns an unsigned transaction. |
| `buildWithdrawalTransaction(...)` | `withdraw` | Returns an unsigned transaction. |
| `updateAllocationTargets(...)` | `update_allocations` | Permissioned to Rebalance Authority. |
| `setVaultStatus(...)` | `set_status` | Permissioned to Vault Manager. |
| `claimFees(id)` | `claim_fees` | Permissioned to Vault Manager. |

## Event Mapping

| Contract Event Topic | SDK Event Model |
| :--- | :--- |
| `vault`, `deposit` | `SpectraDepositEvent` |
| `vault`, `withdraw` | `SpectraWithdrawalEvent` |
| `vault`, `rebalance` | `SpectraRebalanceEvent` |
| `vault`, `config` | `SpectraConfigUpdateEvent` |
| `vault`, `fees` | `SpectraFeeClaimEvent` |
