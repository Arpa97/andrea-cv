<template>
  <main class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
    <header class="sticky top-0 z-40 backdrop-blur border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-50/70 dark:bg-slate-900/70">
      <div class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="font-semibold tracking-wide">
          {{ t('nav.brand') }}
        </div>
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
      </div>
    </header>

    <RouterView />
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
