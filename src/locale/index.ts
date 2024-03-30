import { createI18n } from 'vue-i18n'

import { LocalStorageKey, LocaleOptions } from '@/types/constants'
import { get } from 'lodash'

const defaultLocale = localStorage.getItem(LocalStorageKey.localeKey) || LocaleOptions.en

const getMessageFromModules = (_moduleMap: Record<string, unknown>) => {
  const ret = {}
  for (const key in _moduleMap) {
    const exportContent = get(_moduleMap[key], 'default')
    if (exportContent) {
      Object.assign(ret, exportContent)
    }
  }
  return ret
}
const koMessages = getMessageFromModules(import.meta.glob('./ko-KR/*.json', { eager: true }))
const enMessages = getMessageFromModules(import.meta.glob('./en-US/*.json', { eager: true }))

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: LocaleOptions.en,
  legacy: false,
  allowComposition: true,
  messages: {
    [LocaleOptions.en]: enMessages,
    [LocaleOptions.ko]: koMessages
  }
})

export default i18n
