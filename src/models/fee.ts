export interface FeeConfig {
  managementFeeBps: number;
  maxFeeBps: number;
}

export interface AccruedFees {
  asset: string;
  amount: bigint;
  formattedAmount: string;
}
