import { AssetAllocation } from '../models/allocation';
import { TOTAL_BPS } from '../config/defaults';
import { SpectraError } from '../errors/SpectraError';
import { SpectraErrorCode } from '../errors/errorCodes';
import { isValidAddress } from '../utils/address';

export function validateAllocations(allocations: AssetAllocation[]): void {
  const assets = new Set<string>();
  let total = 0;

  for (const alloc of allocations) {
    if (!isValidAddress(alloc.asset)) {
      throw new SpectraError(SpectraErrorCode.INVALID_ADDRESS, `Invalid asset address: ${alloc.asset}`);
    }
    if (assets.has(alloc.asset)) {
      throw new SpectraError(SpectraErrorCode.DUPLICATE_ASSET, `Duplicate asset: ${alloc.asset}`);
    }
    assets.add(alloc.asset);
    total += alloc.targetBps;
  }

  if (total !== TOTAL_BPS) {
    throw new SpectraError(
      SpectraErrorCode.INVALID_ALLOCATION,
      `Total allocation must be ${TOTAL_BPS} bps, got ${total}`
    );
  }
}
