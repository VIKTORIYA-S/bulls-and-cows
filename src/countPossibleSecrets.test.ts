import { describe, it, expect } from 'vitest';
import { countPossibleSecrets } from './countPossibleSecrets';

describe('countPossibleSecrets', () => {
  it('длина 1 в десятичной системе', () => {
    expect(countPossibleSecrets(1, 10)).toBe(10);
  });
  it('длина 4 в десятичной системе', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });
  it('длина 2 в двоичной системе', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });
  it('длина 6 в hex', () => {
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
  });
  it('длина больше основания даёт 0', () => {
    expect(countPossibleSecrets(3, 2)).toBe(0);
  });
});
