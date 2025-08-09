const KEY = 'ed_streak';
const TODAY = new Date().toDateString();
export type Streak = { days: number; last: string };
export function getStreak(): Streak {
  if (typeof window === 'undefined') return { days: 0, last: TODAY };
  const raw = localStorage.getItem(KEY);
  if (!raw) return { days: 0, last: TODAY };
  try { return JSON.parse(raw) as Streak; } catch { return { days: 0, last: TODAY }; }
}
export function bumpStreak() {
  if (typeof window === 'undefined') return;
  const s = getStreak();
  if (s.last !== TODAY) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    s.days = (s.last === yesterday) ? s.days + 1 : 1;
    s.last = TODAY;
    localStorage.setItem(KEY, JSON.stringify(s));
  }
}
