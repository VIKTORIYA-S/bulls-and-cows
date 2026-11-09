function memoize<A extends unknown[], R>(
  fn: (...args: A) => R,
): (...args: A) => R {
  const cache = new Map<string, R>();
  return (...args: A): R => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as R;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

function permutations(length: number, base: number): number {
  if (length === 0) {
    return 1;
  }
  return base * permutations(length - 1, base - 1);
}

export const countPossibleSecrets = memoize(permutations);
