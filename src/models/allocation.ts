export interface AssetAllocation {
  asset: string;
  targetBps: number;
}

export interface AllocationTargets {
  vaultId: string;
  allocations: AssetAllocation[];
  totalBps: number;
}
