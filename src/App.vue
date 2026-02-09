<template>
  <main class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
    <Hero />
    <Experience />
    <Education />
    <Skills />
    <Contact />
  </main>
</template>

<script setup>
import Hero from './components/Hero.vue'
import Experience from './components/Experience.vue'
import Education from './components/Education.vue'
import Skills from './components/Skills.vue'
import Contact from './components/Contact.vue'
</script>
