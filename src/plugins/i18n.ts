import { i18n } from '~/locales'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(i18n)

  // Keeps <html lang> in sync with the active locale, for screen readers and browser translation
  useHead({
    htmlAttrs: {
      lang: () => i18n.global.locale.value,
    },
  })
})
