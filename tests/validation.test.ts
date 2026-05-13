import { describe, it, expect } from 'vitest';
import { validateAllocations, SpectraError, SpectraErrorCode } from '../src';

describe('Validation', () => {
  it('should validate correct allocations', () => {
    const allocations = [
      { asset: 'GB'.padEnd(56, '0'), targetBps: 5000 },
      { asset: 'GC'.padEnd(56, '0'), targetBps: 5000 },
    ];
    expect(() => validateAllocations(allocations)).not.toThrow();
  });

  it('should throw if total bps is not 10,000', () => {
    const allocations = [
      { asset: 'GB'.padEnd(56, '0'), targetBps: 9000 },
    ];
    expect(() => validateAllocations(allocations)).toThrow(
      new SpectraError(SpectraErrorCode.INVALID_ALLOCATION, 'Total allocation must be 10000 bps, got 9000')
    );
  });

  it('should throw if there are duplicate assets', () => {
    const asset = 'GB'.padEnd(56, '0');
    const allocations = [
      { asset, targetBps: 5000 },
      { asset, targetBps: 5000 },
    ];
    expect(() => validateAllocations(allocations)).toThrow(
      new SpectraError(SpectraErrorCode.DUPLICATE_ASSET, `Duplicate asset: ${asset}`)
    );
  });
});
