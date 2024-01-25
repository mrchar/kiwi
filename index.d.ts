import { Ref, ComputedRef } from "vue"

/**
 * 可以使用预定义的语言标识，避免使用字符串时写错，你也可以定义自己的语言标识列表
 */
export const [zh, en]: [string, string]

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
  setLocale: SetLocaleFunction

  /**
   * 用于创建新的Message，Message的值会随locale动态变化
   *
   * @param translations 默认提供的翻译选项，必须包含defaultLocale对应的翻译
   */
  createMessage: CreateMessageFunction

  /**
   * 在template中直接使用翻译的工具方法
   *
   * @param translations 响应式返回翻译的内容
   */
  getLocaleTranslation: GetLocaleTranslationFunction

  /**
   * 用于创建Message的帮助函数，和CreateMessage作用相同
   *
   * @param translations 翻译选项
   * @returns
   */
  m: CreateMessageFunction

  /**
   * 用于在template中使用的帮助函数，直接返回翻译的值而不是响应式对象
   *
   * @param translations 翻译选项
   * @returns
   */
  t: GetLocaleTranslationFunction
}

export type CreateInstanceFunction = (defaultLocale: string) => Instance

/**
 * 创建一个新的国际化实例
 *
 * @param defaultLocale 指定默认的语言，创建Message时必须提供默认语言的翻译
 * @returns 国际化实例
 */
export const createInstance: CreateInstanceFunction

/**
 * 用于创建国际化实例的帮助函数
 */
export const i18n: CreateInstanceFunction

/**
 * 默认实例，使用en作为默认语言
 */
export const defaultInstance: Instance

/**
 * 默认实例的默认语言
 */
export const defaultLocale: string

/**
 * 默认实例当前的语言
 */
export const locale: Readonly<Ref<string>>

export type SetLocaleFunction = (locale: string) => void

/**
 * 修改默认实例的语言
 */
export const setLocale: SetLocaleFunction

export type CreateMessageFunction = (translations: Translations) => Message

/**
 * 使用默认实例创建消息
 */
export const createMessage: CreateMessageFunction

export type GetLocaleTranslationFunction = (
  translations: Translations
) => string

/**
 * 使用默认实例在template中创建翻译
 */
export const getLocaleTranslation: GetLocaleTranslationFunction
/**
 * 使用默认实例创建消息， 等同于createMessage
 */
export const m: CreateMessageFunction

/**
 * 在template中直接使用翻译，等同于getLocaleTranslation
 */
export const t: CreateMessageFunction
