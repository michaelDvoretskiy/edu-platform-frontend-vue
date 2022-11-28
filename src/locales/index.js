export const locales = [
  'en', 'uk', 'pl'
];
const defaultLocale = 'en'

export function getLocale() {
  return localStorage.getItem('locale') || defaultLocale
}

export function setLocale(locale) {
  localStorage.setItem('locale', locale)
}

export function checkLocale(locale) {
  if (locales.indexOf(locale) == -1) {
    return getLocale()
  }
  return locale
}