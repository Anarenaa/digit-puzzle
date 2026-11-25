import { describe, expect, it } from 'vitest';
import { buildChain } from './buildChain';

describe('buildChain', () => {
  it('returns an empty result for empty input', () => {
    expect(buildChain('')).toEqual({
      chain: '',
      chainArr: [],
      chainCount: 0,
    });
  });

  it('returns a single number when no fragments can connect', () => {
    expect(buildChain('1234, 5678')).toEqual({
      chain: '1234',
      chainArr: ['1234'],
      chainCount: 1,
    });
  });

  it('accepts commas, spaces, and newlines as separators', () => {
    expect(buildChain('608017\n248460, 962282 994725\n177092')).toEqual({
      chain: '24846080177092',
      chainArr: ['248460', '608017', '177092'],
      chainCount: 3,
    });
  });

  it('finds a longer branch instead of stopping at a shorter match', () => {
    expect(buildChain('1234, 3456, 3478, 7890')).toEqual({
      chain: '12347890',
      chainArr: ['1234', '3478', '7890'],
      chainCount: 3,
    });
  });
});
