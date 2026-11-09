export type RecordEntry = {
  attempts: number;
  timeMs: number;
  length: number;
  base: number;
};

export function addRecord(
  records: readonly RecordEntry[],
  entry: RecordEntry,
  limit = 10,
): RecordEntry[] {
  return [...records, entry]
    .sort((a, b) => a.attempts - b.attempts || a.timeMs - b.timeMs)
    .slice(0, limit);
}
