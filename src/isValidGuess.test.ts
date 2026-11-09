import { describe, it, expect } from 'vitest';
import { isValidGuess } from './isValidGuess';

describe('isValidGuess', () => {
  it('принимает корректную попытку', () => {
    expect(isValidGuess('0123', 4, 10)).toBe(true);
  });
  it('отвергает неверную длину', () => {
    expect(isValidGuess('012', 4, 10)).toBe(false);
  });
  it('отвергает недопустимые символы', () => {
    expect(isValidGuess('01a3', 4, 10)).toBe(false);
  });
  it('отвергает повторяющиеся цифры', () => {
    expect(isValidGuess('0113', 4, 10)).toBe(false);
  });
  it('принимает hex в любом регистре', () => {
    expect(isValidGuess('aBcD', 4, 16)).toBe(true);
  });
  it('считает a и A одной цифрой', () => {
    expect(isValidGuess('aAcD', 4, 16)).toBe(false);
  });
});
