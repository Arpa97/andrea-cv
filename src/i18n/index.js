import { createI18n } from 'vue-i18n'
import en from './en.json'
import it from './it.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    it
  }
})

