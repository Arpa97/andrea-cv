<template>
  <section class="bg-slate-800/40 py-24">
    <div class="max-w-5xl mx-auto px-6">
      <h3 class="text-3xl font-semibold mb-12">
        {{ t('skills.title') }}
      </h3>

      <div class="grid md:grid-cols-2 gap-8">
        <div
          v-for="group in groups"
          :key="group.name"
          class="bg-slate-900 p-6 rounded-2xl"
        >
          <h4 class="font-medium mb-2">
            {{ group.name }}
          </h4>
          <p class="text-slate-400">
            {{ group.items.join(', ') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const { t, tm } = useI18n()
const groups = computed(() => tm('skills.groups'))
</script>

