import { describe, it, expect } from 'vitest';
import { createDigitValidator } from './createDigitValidator';

describe('createDigitValidator', () => {
  it('принимает допустимые цифры двоичной системы', () => {
    const isBinaryDigit = createDigitValidator(2);
    expect(isBinaryDigit('0')).toBe(true);
    expect(isBinaryDigit('1')).toBe(true);
  });

  it('отвергает недопустимые символы двоичной системы', () => {
    const isBinaryDigit = createDigitValidator(2);
    expect(isBinaryDigit('2')).toBe(false);
    expect(isBinaryDigit('a')).toBe(false);
  });

  it('принимает hex-цифры в любом регистре', () => {
    const isHexDigit = createDigitValidator(16);
    expect(isHexDigit('a')).toBe(true);
    expect(isHexDigit('F')).toBe(true);
    expect(isHexDigit('9')).toBe(true);
  });

  it('отвергает символы вне hex-алфавита', () => {
    const isHexDigit = createDigitValidator(16);
    expect(isHexDigit('g')).toBe(false);
    expect(isHexDigit('-')).toBe(false);
  });

  it('отвергает пустую строку и строки длиннее одного символа', () => {
    const isBinaryDigit = createDigitValidator(2);
    expect(isBinaryDigit('')).toBe(false);
    expect(isBinaryDigit('01')).toBe(false);
  });
});
