import { describe, it, expect } from 'vitest';
import { generateSecret } from './generateSecret';

describe('generateSecret', () => {
  it('возвращает строку нужной длины', () => {
    const secret = generateSecret(4, 10);
    expect(secret).toHaveLength(4);
  });

  it('цифры не повторяются', () => {
    const secret = generateSecret(4, 10);
    const unique = new Set(secret);
    expect(unique.size).toBe(4);
  });

  it('при одинаковом random даёт одинаковый результат', () => {
    const fixedRandom = () => 0.5;
    const first = generateSecret(4, 10, fixedRandom);
    const second = generateSecret(4, 10, fixedRandom);
    expect(first).toBe(second);
  });

  it('для hex использует только символы 0-9 и a-f', () => {
    const secret = generateSecret(6, 16);
    expect(secret).toMatch(/^[0-9a-f]{6}$/);
  });
});
