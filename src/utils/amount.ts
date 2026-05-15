/**
 * Precision and formatting utilities for Stellar assets.
 * 
 * Spectra uses 7 decimal places for most asset calculations, consistent with 
 * the Stellar Asset Contract (SAC) standard.
 */

/**
 * Converts a decimal amount string or number to an integer bigint representation (stroops).
 * 
 * This utility handles the conversion from human-readable strings (e.g., "1.50")
 * to the integer representation used by Soroban smart contracts (e.g., 15000000n).
 *
 * @param amount - The human-readable decimal amount (e.g., "10.5").
 * @param decimals - The number of decimal places (default is 7 for standard Stellar assets).
 * @returns The equivalent amount as a BigInt in stroops.
 * 
 * @example
 * ```ts
 * toStroops("1.25") // returns 12500000n
 * ```
 */
export function toStroops(amount: string | number, decimals: number = 7): bigint {
  const [integral, fractional = ''] = amount.toString().split('.');
  const paddedFractional = fractional.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(integral + paddedFractional);
}

/**
 * Converts an integer bigint representation (stroops) back to a human-readable decimal string.
 * 
 * This is the inverse of `toStroops`. It takes the large integer from the contract
 * and formats it for display in the UI or logs.
 *
 * @param amount - The BigInt or string representation of the amount in stroops.
 * @param decimals - The number of decimal places (default is 7).
 * @returns A formatted decimal string with trailing zeros removed.
 * 
 * @example
 * ```ts
 * fromStroops(12500000n) // returns "1.25"
 * ```
 */
export function fromStroops(amount: bigint | string, decimals: number = 7): string {
  const amountStr = amount.toString().padStart(decimals + 1, '0');
  const integral = amountStr.slice(0, -decimals);
  const fractional = amountStr.slice(-decimals).replace(/0+$/, '');
  return fractional ? `${integral}.${fractional}` : integral;
}

/**
 * Calculates a proportional value based on basis points (bps).
 * 
 * Basis points are used for fees and allocations. 10,000 bps represents 100.00%.
 * This utility ensures safe integer math when calculating percentages.
 *
 * @param amount - The base BigInt amount to calculate from.
 * @param bps - The percentage expressed in basis points (e.g., 50 for 0.5%).
 * @returns The calculated percentage of the amount as a BigInt.
 */
export function calculateBps(amount: bigint, bps: number): bigint {
  return (amount * BigInt(bps)) / 10000n;
}
