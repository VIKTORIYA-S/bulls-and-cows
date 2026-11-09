import type { RecordEntry } from './records.js';

const KEY = 'bulls-and-cows-records';

export function loadRecords(): RecordEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as RecordEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveRecords(records: readonly RecordEntry[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(records));
  } catch {
    // хранилище недоступно: игра продолжает работать без рекордов
  }
}
