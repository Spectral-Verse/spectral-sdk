export function isValidHash(hash: string): boolean {
  return /^[0-9a-fA-F]{64}$/.test(hash);
}
