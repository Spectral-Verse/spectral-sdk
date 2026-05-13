import { describe, it, expect } from 'vitest';
import { parseContractValue } from '../src';
import { xdr, nativeToScVal } from '@stellar/stellar-sdk';

describe('Parsers', () => {
  it('should parse contract values correctly', () => {
    const scVal = nativeToScVal('test');
    expect(parseContractValue(scVal)).toBe('test');
  });
});
