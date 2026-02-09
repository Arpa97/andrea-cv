<template>
  <main class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
    <header class="sticky top-0 z-40 backdrop-blur border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-50/70 dark:bg-slate-900/70">
      <div class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <div class="font-semibold tracking-wide">
          {{ t('nav.brand') }}
        </div>
        <div class="flex items-center gap-6">
          <nav class="flex items-center gap-6 text-sm">
            <RouterLink
              to="/"
              class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
              active-class="text-slate-900 dark:text-white font-medium"
            >
              {{ t('nav.home') }}
            </RouterLink>
            <RouterLink
              to="/portfolio"
              class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
              active-class="text-slate-900 dark:text-white font-medium"
            >
              {{ t('nav.portfolio') }}
            </RouterLink>
          </nav>

          <div class="hidden sm:flex items-center gap-3 text-xs uppercase tracking-wide">
            <div class="flex items-center gap-2 rounded-full border border-slate-300/60 dark:border-slate-700/60 px-2 py-1 bg-white/70 dark:bg-slate-900/60">
              <button
                @click="setLocale('en')"
                :class="pillButtonClass(locale, 'en')"
              >
                EN
              </button>
              <button
                @click="setLocale('it')"
                :class="pillButtonClass(locale, 'it')"
              >
                IT
              </button>
            </div>
            <div class="flex items-center gap-2 rounded-full border border-slate-300/60 dark:border-slate-700/60 px-2 py-1 bg-white/70 dark:bg-slate-900/60">
              <button
                @click="setTheme('light')"
                :class="pillButtonClass(theme, 'light')"
              >
                {{ t('hero.themeLight') }}
              </button>
              <button
                @click="setTheme('dark')"
                :class="pillButtonClass(theme, 'dark')"
              >
                {{ t('hero.themeDark') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <RouterView />
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { onMounted, ref, watch } from 'vue'
const { t, locale } = useI18n()

const theme = ref('dark')

const setLocale = (lang) => {
  locale.value = lang
}

const setTheme = (value) => {
  theme.value = value
}

const pillButtonClass = (model, value) =>
  model === value
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
