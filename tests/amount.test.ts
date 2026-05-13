import { describe, it, expect } from 'vitest';
import { toStroops, fromStroops } from '../src';

describe('Amount Utilities', () => {
  it('should convert amount to stroops correctly', () => {
    expect(toStroops('100.0')).toBe(1000000000n);
    expect(toStroops(100)).toBe(1000000000n);
    expect(toStroops('0.1234567')).toBe(1234567n);
  });

  it('should convert stroops back to amount correctly', () => {
    expect(fromStroops(1000000000n)).toBe('100');
    expect(fromStroops(1234567n)).toBe('0.1234567');
  });
});
