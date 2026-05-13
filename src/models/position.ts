export interface UserPosition {
  vaultId: string;
  userAddress: string;
  shares: bigint;
  formattedShares: string;
  sharePercentage: number;
}
