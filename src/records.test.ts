import { describe, it, expect } from 'vitest';
import { addRecord } from './records';

const rec = (attempts: number, timeMs: number) => ({
  attempts,
  timeMs,
  length: 4,
  base: 10,
});

describe('addRecord', () => {
  it('сортирует по числу попыток', () => {
    const result = addRecord([rec(5, 1000)], rec(3, 2000));
    expect(result[0].attempts).toBe(3);
  });
  it('при равенстве попыток сортирует по времени', () => {
    const result = addRecord([rec(3, 5000)], rec(3, 2000));
    expect(result[0].timeMs).toBe(2000);
  });
  it('не меняет исходный массив', () => {
    const records = [rec(5, 1000)];
    addRecord(records, rec(3, 2000));
    expect(records).toHaveLength(1);
  });
  it('оставляет не больше limit записей', () => {
    const records = Array.from({ length: 10 }, (_, i) => rec(i + 2, 1000));
    expect(addRecord(records, rec(1, 1000), 10)).toHaveLength(10);
  });
});
