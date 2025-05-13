# 奇异果 KIWI

本项目为Vue实现了一个更加内聚的国际化组件，
相比于其他国际化组件将翻译按照语言定义在不同文件中不同，
本项目主张将翻译直接定义在使用它的地方，旨在将国际化的文本和运行他的代码绑定在一起，
避免了在代码和翻译文件间来回切换，可以大大减少开发者编写代码时的心智负担，
这也有利于开发者在第一时间为文本预留国际化的可能性，而不是等功能开发完成之后从头梳理哪些文本需要国际化。

当然，在有些工作分配明确的团队中，负责国际化的成员不一定能够完全读懂代码，也不希望翻译分散在各处，
本项目并不反对将所有翻译集中在一处。你也可以使用将本项目定义的翻译集中在一个js文件中，
可以编写一个列表或者对象，甚至是一棵树，然后在需要的地方进行引用。
本项目唯一希望的是，不要将同一个文本需要的翻译分别放在不同的地方，
把他们集中在一起是更好的，这可以方便翻译者对照查看，避免某些翻译错误和遗失。

## 快速开始

createMessage 方法用于创建国际化文本，
使用对象传入不同语言的翻译，对象的 key 是对应的语言，value 是翻译的内容,
返回的结果是一个响应时对象，它的值会根据locale变化，你也可以使用createMessage的缩写m。

setLocale方法用于修改locale，传入的参数是一个字符串，代表要使用的语言，这和定义国际化文本时传入的key是对应的。

```javascript
import {createMessage, locale, setLocale} from "kiwi"

const message = createMessage({zh: "你好！", en: "Hello!"})

function toggleLanguage() {
    locale.value === "zh" ? setLocale("en") : setLocale("zh")
}
```

你也可以创建一个新的实例，在创建实例时可以传入一个默认语言，在国际化文本没有当前语言的翻译时，会返回默认语言对应的翻译,
你也可以使用 createInstance 的缩写 i18n。

```javascript
import {i18n} from "kiwi"

const instance = i18n({defaultLocale: "zh"})

const message = i18n.createMessage({zh: "你好！", en: "Hello!"})
// 其他内容...
```

你可以传入一个响应式对象，用来动态修改instance的locale。

```javascript
import {i18n} from "kiwi"

const locale = ref("zh")

const instance = i18n(locale, {defaultLocale: "zh"})

const message = i18n.createMessage({zh: "你好！", en: "Hello!"})
```

## 单文件组件

如果你需要在单文件组件的`template`中直接定义并使用消息，可以使用createTranslation方法，他封装了createMessage方法，并直接返回国际化的值，
你也可以使用缩写t。

```vue

<template>
  <div>{{ createTranslation({zh: "你好！", en: "Hello!"})) }}</div>
</template>

<script>
  import {createTranslation} from "kiwi";
</script>
```

## 使用模板

在实现国际化的时候，通常我们还需要支持模板，kiwi的模板借助js的模板字符串实现，只需要定义一个方法返回一个模板字符串，并传入需要的参数。

```javascript
import {createMessage} from "kiwi"

const message = createMessage({
    zh: (args) => `你好${args[0]}！`, 
    en: (args) => `Hello${args[0]}!`
}, "李华")
```

或者你也可以使用占位符创建创建模板。

```javascript
import {createMessage} from "kiwi"

const message = createMessage({zh: "你好{0}！", en: "Hello{0}!"}, "李华")
```

## 翻译文件

如果你希望将翻译按照语言定义成单独的文件，kiwi也是可以提供支持的，你可以要翻译的内容定义成一个`object`，
然后在创建实例的时候传入定义对象，这样就可以使用对象获取消息。

```javascript
import {i18n} from "kiwi"
import zh from "./zh.js" // {greeting: { hello: "你好！"}}
import en from "./en.js" // {greeting: {hello: "Hello!"}}

const locale = ref("zh")

const instance = i18n({zh, en}, locale, {defaultLocale: "zh"})

const message = i18n.getMessage("greeting.hello")
// 其他内容...
```

当然，我更加建议你直接使用m方法构建翻译树，这可以帮助你在编译阶段发现错误。

```javascript
{
    greeting:{
        hello: m({zh: "你好！", en: "Hello!"})
    }
}
```
