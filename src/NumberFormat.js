/**
 * @param number {number}
 * @param n {number} length of decimal
 * @param x {number} length of sections
 */
export function numberFormat (number, n = 2, x = 3) {
  number = Math.round(Number(number) * 1e2) / 1e2;
  const re = '\\d(?=(\\d{' + x + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return number.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}
