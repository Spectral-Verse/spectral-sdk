import { AssetAllocation } from '../models/allocation';
import { TOTAL_BPS } from '../config/defaults';
import { SpectralError } from '../errors/SpectralError';
import { SpectralErrorCode } from '../errors/errorCodes';
import { isValidAddress } from '../utils/address';

export function validateAllocations(allocations: AssetAllocation[]): void {
  const assets = new Set<string>();
  let total = 0;

  for (const alloc of allocations) {
    if (!isValidAddress(alloc.asset)) {
      throw new SpectralError(
        SpectralErrorCode.INVALID_ADDRESS,
        `Invalid asset address: ${alloc.asset}`
      );
    }
    if (assets.has(alloc.asset)) {
      throw new SpectralError(SpectralErrorCode.DUPLICATE_ASSET, `Duplicate asset: ${alloc.asset}`);
    }
    assets.add(alloc.asset);
    total += alloc.targetBps;
  }

  if (total !== TOTAL_BPS) {
    throw new SpectralError(
      SpectralErrorCode.INVALID_ALLOCATION,
      `Total allocation must be ${TOTAL_BPS} bps, got ${total}`
    );
  }
}
