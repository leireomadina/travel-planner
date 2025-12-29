// src/locales/vue-i18n.d.ts
import 'vue-i18n'
import type { MessageSchema } from './index'

declare module 'vue-i18n' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface DefineLocaleMessage extends MessageSchema {}
}
