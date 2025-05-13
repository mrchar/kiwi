<script setup lang="ts">
import { computed } from "vue"
import { en, zh, locale, setLocale, t } from "../../lib/main"

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
  <div>{{ t({ zh: "你好！", en: "Hello!" }) }}</div>
  <button @click="toggleLanguage">{{ language }}</button>
</template>

<style scoped>
div {
  margin: 1rem;
  font-size: 2rem;
}
</style>
