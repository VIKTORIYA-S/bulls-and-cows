import { describe, it, expect } from 'vitest';
import { evaluateGuess } from './evaluateGuess';

describe('evaluateGuess', () => {
  it('полное совпадение: все быки', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
  });
  it('все цифры не на месте: все коровы', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
  });
  it('смешанный случай', () => {
    expect(evaluateGuess('1234', '1243')).toEqual({ bulls: 2, cows: 2 });
  });
  it('нет совпадений', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
  });
  it('регистр hex не важен', () => {
    expect(evaluateGuess('abcd', 'ABCD')).toEqual({ bulls: 4, cows: 0 });
  });
});
