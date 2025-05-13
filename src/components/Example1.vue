<script setup lang="ts">
import { computed } from "vue"
import { en, zh, locale, setLocale, m } from "../../lib/main"

const message = m({ zh: "你好！", en: "Hello!" })

const language = computed(() => {
  switch (locale.value) {
    case zh:
      return "中文"
    case en:
      return "english"
  }
})

function toggleLanguage() {
  locale.value === zh ? setLocale(en) : setLocale(zh)
}
</script>

<template>
  <div>{{ message }}</div>
  <button @click="toggleLanguage">{{ language }}</button>
</template>

<style scoped>
div {
  margin: 1rem;
  font-size: 2rem;
}
</style>
