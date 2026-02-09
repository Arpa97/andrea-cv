<template>
  <section class="min-h-screen flex items-center justify-center px-6">
    <div class="max-w-3xl text-center">
      <h1 class="text-4xl md:text-6xl font-bold">
        {{ t('hero.name') }}
      </h1>

      <h2 class="mt-4 text-xl md:text-2xl text-slate-400">
        {{ t('hero.role') }}
      </h2>

      <p class="mt-6 text-slate-300 leading-relaxed">
        {{ t('hero.tagline') }}<br />
        {{ t('hero.domain') }}
      </p>

      <div class="mt-10 flex justify-center gap-6">
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
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const setLocale = (lang) => {
  locale.value = lang
}

const buttonClass = (lang) =>
  locale.value === lang
    ? 'text-white font-medium'
    : 'text-slate-400 hover:text-white'
</script>

