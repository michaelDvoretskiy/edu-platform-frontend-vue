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