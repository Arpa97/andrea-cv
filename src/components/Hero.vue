<template>
  <section class="min-h-screen flex items-center justify-center px-6">
    <div class="max-w-3xl text-center">
      <h1 class="text-4xl md:text-6xl font-bold" v-reveal>
        {{ t('hero.name') }}
      </h1>

      <h2
        class="mt-4 text-xl md:text-2xl text-slate-600 dark:text-slate-400"
        v-reveal="80"
      >
        {{ t('hero.role') }}
      </h2>

      <p
        class="mt-6 text-slate-700 dark:text-slate-300 leading-relaxed"
        v-reveal="160"
      >
        {{ t('hero.tagline') }}<br />
        {{ t('hero.domain') }}
      </p>

      <div
        class="mt-10 flex justify-center"
        v-reveal="240"
      >
        <div class="h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-emerald-400 to-teal-400 opacity-70" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
