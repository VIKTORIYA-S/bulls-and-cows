import { describe, it, expect } from 'vitest';
import { addGuess, hasGuess, isWon } from './gameState';

describe('gameState', () => {
  it('addGuess добавляет запись в конец', () => {
    const history = [{ guess: '1234', bulls: 1, cows: 1 }];
    const entry = { guess: '5678', bulls: 0, cows: 0 };
    expect(addGuess(history, entry)).toEqual([...history, entry]);
  });
  it('addGuess не меняет исходный массив', () => {
    const history = [{ guess: '1234', bulls: 1, cows: 1 }];
    addGuess(history, { guess: '5678', bulls: 0, cows: 0 });
    expect(history).toHaveLength(1);
  });
  it('hasGuess находит повтор без учёта регистра', () => {
    const history = [{ guess: 'abcd', bulls: 0, cows: 0 }];
    expect(hasGuess(history, 'ABCD')).toBe(true);
  });
  it('hasGuess возвращает false для новой попытки', () => {
    expect(hasGuess([], '1234')).toBe(false);
  });
  it('isWon true, когда быков столько же, сколько длина', () => {
    expect(isWon({ guess: '1234', bulls: 4, cows: 0 }, 4)).toBe(true);
  });
  it('isWon false, когда быков меньше', () => {
    expect(isWon({ guess: '1234', bulls: 3, cows: 1 }, 4)).toBe(false);
  });
});
