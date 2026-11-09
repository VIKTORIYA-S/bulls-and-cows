export function createDigitValidator(base: number): (char: string) => boolean {
  const alphabet = '0123456789abcdef'.slice(0, base);
  return (char) => alphabet.includes(char.toLowerCase());
}
