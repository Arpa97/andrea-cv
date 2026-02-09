<template>
  <section class="max-w-5xl mx-auto px-6 py-24 text-center">
    <h3 class="text-3xl font-semibold mb-6" v-reveal>
      {{ t('contact.title') }}
    </h3>

    <p class="text-slate-500 dark:text-slate-400 mb-4" v-reveal="80">
      {{ t('contact.location') }}
    </p>

    <a
      href="mailto:andreadarpa1997@gmail.com"
      class="text-indigo-500 dark:text-indigo-400 hover:underline text-lg"
      v-reveal="160"
    >
      andreadarpa1997@gmail.com
    </a>
  <br>
    <a
      href="https://github.com/Arpa97"
      class="text-indigo-500 dark:text-indigo-400 hover:underline text-lg"
      v-reveal="160"
    >
      GitHub (Arpa97)
    </a>
    <br>
     <a
      href="tel: +393914716317"
      class="text-indigo-500 dark:text-indigo-400 hover:underline text-lg"
      v-reveal="160"
    >
      +39 3914716317
    </a>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
