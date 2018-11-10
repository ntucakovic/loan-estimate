/**
 * @param number {number}
 * @param decimals {number} length of decimals
 * @param sections {number} length of sections
 *
 * @return {string}
 */
export function numberFormat(number, decimals = 2, sections = 3) {
  number = Math.round(Number(number) * 1e2) / 1e2;
  const re =
    "\\d(?=(\\d{" + sections + "})+" + (decimals > 0 ? "\\." : "$") + ")";
  return number
    .toFixed(Math.max(0, ~~decimals))
    .replace(new RegExp(re, "g"), "$&,");
}

/**
 * Retrieves browser language identifier, used by localization.
 *
 * @returns {string}
 */
export function getLanguage() {
  const translationRegex = /(sr|bs|hr)/;
  let language = "en";

  try {
    if (
      window.navigator.language.match(translationRegex) ||
      (window.navigator.languages &&
        window.navigator.languages.find(language =>
          language.match(translationRegex)
        ))
    ) {
      language = "sr";
    }
  } catch (e) {
    // Do nothing, just avoid breaking the app.
  }

  return language;
}
