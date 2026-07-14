import { describe, it, expect } from 'vitest';
import { validateAllocations, SpectralError, SpectralErrorCode } from '../src';

describe('Validation', () => {
  const VALID_ASSET_A = 'GCXL6D34GPU3KWGL2CZXDVC554VUFESYGXODSPT24LNNNKGWIBQIDVXZ';
  const VALID_ASSET_B = 'GAAETTGMCAFCBK2Y5FPS7DUGJVBE72HTQFA6L4G2F7UB72XZRECIUUO5';

  it('should validate correct allocations', () => {
    const allocations = [
      { asset: VALID_ASSET_A, targetBps: 5000 },
      { asset: VALID_ASSET_B, targetBps: 5000 },
    ];
    expect(() => validateAllocations(allocations)).not.toThrow();
  });

  it('should throw if total bps is not 10,000', () => {
    const allocations = [{ asset: VALID_ASSET_A, targetBps: 9000 }];
    expect(() => validateAllocations(allocations)).toThrow(
      new SpectralError(
        SpectralErrorCode.INVALID_ALLOCATION,
        'Total allocation must be 10000 bps, got 9000'
      )
    );
  });

  it('should throw if there are duplicate assets', () => {
    const asset = VALID_ASSET_A;
    const allocations = [
      { asset, targetBps: 5000 },
      { asset, targetBps: 5000 },
    ];
    expect(() => validateAllocations(allocations)).toThrow(
      new SpectralError(SpectralErrorCode.DUPLICATE_ASSET, `Duplicate asset: ${asset}`)
    );
  });
});
