<template>
  <section class="max-w-5xl mx-auto px-6 py-16">
    <div class="max-w-3xl">
      <h1 class="text-3xl md:text-4xl font-semibold" v-reveal>
        {{ t('portfolio.title') }}
      </h1>
      <p
        class="mt-4 text-slate-600 dark:text-slate-400"
        v-reveal="80"
      >
        {{ t('portfolio.subtitle') }}
      </p>
    </div>

    <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="(item, index) in items"
        :key="item.title"
        class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition"
        v-reveal="index * 70"
      >
        <h3 class="text-lg font-semibold">
          {{ item.title }}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {{ item.description }}
        </p>

        <div
          v-if="item.links?.length"
          class="mt-5 flex flex-wrap gap-3 text-sm"
        >
          <a
            v-for="link in item.links"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {{ link.label }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const { t, tm } = useI18n()

const items = computed(() => tm('portfolio.items'))
</script>
