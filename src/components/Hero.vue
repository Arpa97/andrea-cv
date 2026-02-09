<template>
  <section class="min-h-screen flex items-center justify-center px-6">
    <div class="max-w-3xl text-center">
      <h1 class="text-4xl md:text-6xl font-bold animate-fade-up">
        {{ t('hero.name') }}
      </h1>

      <h2
        class="mt-4 text-xl md:text-2xl text-slate-600 dark:text-slate-400 animate-fade-up"
        style="--delay: 80ms"
      >
        {{ t('hero.role') }}
      </h2>

      <p
        class="mt-6 text-slate-700 dark:text-slate-300 leading-relaxed animate-fade-up"
        style="--delay: 160ms"
      >
        {{ t('hero.tagline') }}<br />
        {{ t('hero.domain') }}
      </p>

      <div
        class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up"
        style="--delay: 240ms"
      >
        <div class="flex gap-6">
          <button
            @click="setLocale('en')"
            :class="buttonClass('en')"
          >
            EN
          </button>
          <button
            @click="setLocale('it')"
            :class="buttonClass('it')"
          >
            IT
          </button>
        </div>

        <div class="flex items-center gap-3 rounded-full border border-slate-300/60 dark:border-slate-700/60 px-2 py-1 bg-white/70 dark:bg-slate-900/60">
          <button
            @click="setTheme('light')"
            :class="themeButtonClass('light')"
          >
            {{ t('hero.themeLight') }}
          </button>
          <button
            @click="setTheme('dark')"
            :class="themeButtonClass('dark')"
          >
            {{ t('hero.themeDark') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { onMounted, ref, watch } from 'vue'

const { t, locale } = useI18n()
const theme = ref('dark')

const setLocale = (lang) => {
  locale.value = lang
}

const buttonClass = (lang) =>
  locale.value === lang
    ? 'text-slate-900 dark:text-white font-medium'
    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'

const setTheme = (value) => {
  theme.value = value
}

const themeButtonClass = (value) =>
  theme.value === value
    ? 'px-3 py-1 rounded-full text-slate-900 dark:text-white font-medium'
    : 'px-3 py-1 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'

onMounted(() => {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    theme.value = stored
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark'
  } else {
    theme.value = 'light'
  }
})

watch(theme, (value) => {
  document.documentElement.classList.toggle('dark', value === 'dark')
  localStorage.setItem('theme', value)
})
</script>
