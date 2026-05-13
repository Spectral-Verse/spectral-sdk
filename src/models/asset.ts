export interface Asset {
  address: string;
  symbol?: string;
  decimals: number;
}

export interface VaultAssetBalance {
  asset: string;
  balance: bigint;
  formattedBalance: string;
}
