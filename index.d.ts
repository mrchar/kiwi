import { Ref, ComputedRef } from "vue"

/**
 * 表示一个支持国际化的文本，这个文本是响应式的，会根据设置的语言返回对应的翻译
 */
export type Message = ComputedRef<string>

/**
 * 使用键值对的形式定义多种翻译，其中键值是预先定义好的语言标识
 * 例如: {zh: "你好", en: "hello"}
 */
export type Translations = {
  [key: string]: string
}

/**
 * 每个国际化实例绑定一个独立的响应式语言标识，
 * 使用这个实例创建的消息会随着语言标识的变化响应式返回对应的翻译
 */
export interface Instance {
  /**
   * 创建实例时指定的默认语言，如果Message没有匹配locale的翻译，则会返回Ldefaultocale对应的翻译
   */
  defaultLocale: string

  /**
   * 用于表明当前使用的语言，这个值是响应式的，并且是只读的
   */
  locale: Readonly<Ref<string>>

  /**
   * 修改当前locale，Message会随locale响应式变化
   *
   * @param locale 要指定的语言
   */
  setLocale(locale: string): void

  /**
   * 用于创建新的Message，Message的值会随locale动态变化
   *
   * @param translations 默认提供的翻译选项，必须包含defaultLocale对应的翻译
   */
  createMessage(translations: Translations): Message
}
