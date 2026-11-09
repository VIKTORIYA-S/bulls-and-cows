function pickUnique(
  alphabet: string,
  count: number,
  random: () => number,
): string {
  if (count === 0) {
    return '';
  }
  const index = Math.floor(random() * alphabet.length);
  const picked = alphabet[index];
  const rest = alphabet.slice(0, index) + alphabet.slice(index + 1);
  return picked + pickUnique(rest, count - 1, random);
}

export function generateSecret(
  length: number,
  base: number,
  random: () => number = Math.random,
): string {
  const alphabet = '0123456789abcdef'.slice(0, base);
  return pickUnique(alphabet, length, random);
}
