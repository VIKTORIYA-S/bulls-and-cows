export type GuessEntry = { guess: string; bulls: number; cows: number };

export const addGuess = (
  history: readonly GuessEntry[],
  entry: GuessEntry,
): GuessEntry[] => [...history, entry];

export const hasGuess = (
  history: readonly GuessEntry[],
  guess: string,
): boolean =>
  history.some((e) => e.guess.toLowerCase() === guess.toLowerCase());

export const isWon = (entry: GuessEntry, length: number): boolean =>
  entry.bulls === length;
