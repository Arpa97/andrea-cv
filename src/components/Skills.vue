<template>
  <section class="bg-slate-100/60 dark:bg-slate-800/40 py-24">
    <div class="max-w-5xl mx-auto px-6">
      <h3 class="text-3xl font-semibold mb-12">
        {{ t('skills.title') }}
      </h3>

      <div class="flex flex-wrap gap-3">
        <span
          v-for="(item, index) in items"
          :key="item"
          class="px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 text-sm md:text-base tracking-wide hover:border-indigo-400/60 hover:text-slate-900 dark:hover:text-white transition animate-fade-up"
          :style="{ '--delay': `${index * 40}ms` }"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const { t, tm } = useI18n()

const items = computed(() => {
  const groups = tm('skills.groups') || []
  return groups.flatMap((group) => group.items || [])
})
</script>
