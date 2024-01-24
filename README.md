# 猕猴桃 KIWI

本项目为 Vue 实现了一个更加内聚的国际化组件，相比于其他国际化组件将翻译按照语言定义在不同文件中不同，本项目主张将翻译直接定义在使用它的地方，旨在将国际化的文本和运行他的代码绑定在一起，避免了在代码和翻译文件间来回切换，可以大大减少开发者编写代码时的心智负担，这也有利于开发者在第一时间为文本预留国际化的可能性，而不是等功能开发完成之后从头梳理哪些文本需要国际化。

当然，在有些工作分配明确的团队中，负责国际化的成员不一定能够完全读懂代码，也不希望翻译分散在各处，本项目并不反对将所有翻译集中在一处。你也可以使用将本项目定义的翻译集中在一个 js 文件中，可以编写一个列表或者对象，甚至是一棵树，然后在需要的地方进行引用。本项目唯一希望的是，不要将同一个文本需要的翻译分别放在不同的地方，把他们集中在一起是更好的，这可以方便翻译者对照查看，避免某些翻译错误和遗失。

## 快速开始

createMessage 方法用于创建国际化文本，使用对象传入不同语言的翻译，对象的 key 是对应的语言，value 是翻译的内容, 返回的结果是一个响应时对象，它的值会根据 locale 变化，你也可以使用 createMessage 的缩写 m。

setLocale 方法用于修改 locale，传入的参数是一个字符串，代表要使用的语言，这和定义国际化文本时传入的 key 是对应的。

```javascript
import { createMessage, locale, setLocale } from "kiwi"

const message = createMessage({ zh: "你好！", en: "Hello!" })

function taggleLanguage() {
  locale.value === "zh" ? setLocale("en") : setLocale("zh")
}
```

你也可以创建一个新的实例，在创建实例时可以传入一个默认语言，在国际化文本没有当前语言的翻译时，会返回默认语言对应的翻译, 你也可以使用 createInstance 的缩写 i18n。

```javascript
import { i18n } from "kiwi"

const instance = i18n("zh")

const message = i18n.createMessage({ zh: "你好！", en: "Hello!" })
// 其他内容...
```
