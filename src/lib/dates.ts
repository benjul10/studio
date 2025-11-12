export const fmtDate = (d: Date) =>
  d.toISOString().slice(0, 10); // "YYYY-MM-DD"

export const addDays = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
