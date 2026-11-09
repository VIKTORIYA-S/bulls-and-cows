import { generateSecret } from './generateSecret.js';
import { evaluateGuess } from './evaluateGuess.js';
import { isValidGuess } from './isValidGuess.js';
import { createDigitValidator } from './createDigitValidator.js';
import { countPossibleSecrets } from './countPossibleSecrets.js';
import { addGuess, hasGuess, isWon, type GuessEntry } from './gameState.js';
import { addRecord } from './records.js';
import { loadRecords, saveRecords } from './storage.js';

type Settings = { length: number; base: number };

const BASES = [
  { name: 'bin', value: 2 },
  { name: 'oct', value: 8 },
  { name: 'dec', value: 10 },
  { name: 'hex', value: 16 },
];
const LENGTHS = [2, 3, 4, 5, 6];

const baseName = (base: number): string =>
  BASES.find((b) => b.value === base)?.name ?? String(base);

const app = document.createElement('div');
app.className = 'app';
document.body.append(app);

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  text = '',
  className = '',
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.textContent = text;
  node.className = className;
  return node;
}

function option(label: string, value: number, selected: boolean) {
  const o = el('option', label);
  o.value = String(value);
  o.selected = selected;
  return o;
}

function renderRecords(): HTMLElement {
  const section = el('section');
  section.append(el('h2', 'Таблица рекордов'));
  const records = loadRecords();
  if (records.length === 0) {
    section.append(el('p', 'Пока нет рекордов'));
    return section;
  }
  const list = el('ol');
  list.append(
    ...records.map((r) => {
      const li = el(
        'li',
        `${r.attempts} поп., ${(r.timeMs / 1000).toFixed(1)} с `,
      );
      li.append(el('span', `${r.length} цифр, ${baseName(r.base)}`, 'badge'));
      return li;
    }),
  );
  section.append(list);
  return section;
}

function renderHistory(history: readonly GuessEntry[]): HTMLElement {
  const list = el('ul');
  list.append(
    ...history.map((e) =>
      el('li', `${e.guess} — быков: ${e.bulls}, коров: ${e.cows}`),
    ),
  );
  return list;
}

function renderSettings(settings: Settings): void {
  const lengthSelect = el('select');
  lengthSelect.append(
    ...LENGTHS.map((n) => {
      const o = option(String(n), n, n === settings.length);
      o.disabled = n > settings.base;
      return o;
    }),
  );
  const baseSelect = el('select');
  baseSelect.append(
    ...BASES.map((b) =>
      option(`${b.name} (${b.value})`, b.value, b.value === settings.base),
    ),
  );

  lengthSelect.addEventListener('change', () =>
    renderSettings({ ...settings, length: Number(lengthSelect.value) }),
  );
  baseSelect.addEventListener('change', () => {
    const base = Number(baseSelect.value);
    renderSettings({ base, length: Math.min(settings.length, base) });
  });

  const lengthLabel = el('label', 'Длина: ');
  lengthLabel.append(lengthSelect);
  const baseLabel = el('label', 'Система счисления: ');
  baseLabel.append(baseSelect);

  const total = countPossibleSecrets(settings.length, settings.base);
  const start = el('button', 'Начать игру');
  start.addEventListener('click', () =>
    renderGame(
      settings,
      generateSecret(settings.length, settings.base),
      Date.now(),
      [],
    ),
  );

  app.replaceChildren(
    el('h1', 'Bulls and Cows'),
    lengthLabel,
    baseLabel,
    el('p', `Возможных секретных чисел: ${total}`),
    start,
    renderRecords(),
  );
}

function renderGame(
  settings: Settings,
  secret: string,
  startedAt: number,
  history: readonly GuessEntry[],
): void {
  const { length, base } = settings;
  const isDigit = createDigitValidator(base);

  const input = el('input');
  input.type = 'text';
  input.maxLength = length;
  input.autocomplete = 'off';
  input.placeholder = `${length} разных цифр`;
  input.addEventListener('input', () => {
    input.value = [...input.value].filter(isDigit).join('');
  });

  const message = el('p', '', 'message');
  const button = el('button', 'Проверить');
  button.type = 'submit';
  const form = el('form');
  form.append(input, button);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const guess = input.value.toLowerCase();
    if (!isValidGuess(guess, length, base)) {
      message.textContent = `Нужно ровно ${length} разных цифр`;
      return;
    }
    if (hasGuess(history, guess)) {
      message.textContent = 'Такая попытка уже была';
      return;
    }
    const entry: GuessEntry = { guess, ...evaluateGuess(secret, guess) };
    const next = addGuess(history, entry);
    if (isWon(entry, length)) {
      renderWin(settings, next, Date.now() - startedAt);
      return;
    }
    renderGame(settings, secret, startedAt, next);
  });

  app.replaceChildren(
    el('h1', 'Bulls and Cows'),
    el('p', `Настройки: ${length} цифр, ${baseName(base)}`),
    form,
    message,
    el('h2', `Попытки: ${history.length}`),
    renderHistory(history),
  );
  input.focus();
}

function renderWin(
  settings: Settings,
  history: readonly GuessEntry[],
  timeMs: number,
): void {
  saveRecords(
    addRecord(loadRecords(), {
      attempts: history.length,
      timeMs,
      length: settings.length,
      base: settings.base,
    }),
  );
  const again = el('button', 'Новая игра');
  again.addEventListener('click', () => renderSettings(settings));
  app.replaceChildren(
    el('h1', 'Bulls and Cows'),
    el(
      'p',
      `Победа! Попыток: ${history.length}, время: ${(timeMs / 1000).toFixed(1)} с`,
      'win',
    ),
    again,
    renderHistory(history),
    renderRecords(),
  );
}

renderSettings({ length: 4, base: 10 });
