import { createI18n } from 'vue-i18n'
import es from './es.json'
import en from './en.json'

export type MessageSchema = typeof es

export const i18n = createI18n({
  legacy: false, // enables Composition API mode
  globalInjection: true, // allows using $t directly in templates
  locale: 'es', // default language
  fallbackLocale: 'en', // fallback if translation not found
  messages: { en, es },
})
