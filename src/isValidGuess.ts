import { createDigitValidator } from './createDigitValidator';

export function isValidGuess(
  guess: string,
  length: number,
  base: number,
): boolean {
  const isDigit = createDigitValidator(base);
  const chars = [...guess].map((c) => c.toLowerCase());
  return (
    guess.length === length &&
    chars.every(isDigit) &&
    new Set(chars).size === length
  );
}
