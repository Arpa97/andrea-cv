<template>
  <section class="max-w-5xl mx-auto px-6 py-24">
    <h3 class="text-3xl font-semibold mb-12" v-reveal>
      {{ t('experience.title') }}
    </h3>

    <div class="space-y-12">
      <div
        v-for="(item, index) in items"
        :key="item.company"
        class="border-l-2 border-indigo-500 pl-6"
        v-reveal="index * 90"
      >
        <h4 class="text-xl font-medium">
          {{ item.role }}
        </h4>

        <p class="text-slate-500 dark:text-slate-400">
          {{ item.company }} · {{ item.period }}
        </p>

        <p class="mt-3 text-slate-700 dark:text-slate-300">
          {{ item.description }}
        </p>

        <ul
          v-if="item.highlights?.length"
          class="mt-4 list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1"
        >
          <li
            v-for="highlight in item.highlights"
            :key="highlight"
          >
            {{ highlight }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const { t, tm } = useI18n()

const items = computed(() => tm('experience.items'))
</script>
