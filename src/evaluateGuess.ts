export function evaluateGuess(
  secret: string,
  guess: string,
): { bulls: number; cows: number } {
  const s = [...secret.toLowerCase()];
  const g = [...guess.toLowerCase()];
  const bulls = g.filter((c, i) => c === s[i]).length;
  const common = g.filter((c) => s.includes(c)).length;
  return { bulls, cows: common - bulls };
}
