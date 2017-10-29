/**
 * @param integer number: Number
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
export function numberFormat (number, n, x) {
  number = Math.round(Number(number) * 1e2) / 1e2;
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return number.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}
