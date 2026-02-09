<template>
  <section class="min-h-screen flex items-center justify-center px-6">
    <div class="max-w-3xl text-center">
      <h1
        class="text-4xl md:text-6xl font-bold relative"
        v-reveal
        :class="{
          'game-zoom': gameState === 'escape' || gameState === 'playing',
          'name-recompose': gameState === 'caught'
        }"
      >
        <span class="inline-flex items-center gap-3 relative z-10">
          <span
            class="relative inline-block"
            :class="{
              'name-chasing': gameState === 'escape' || gameState === 'playing'
            }"
          >
            <span>{{ nameBase }}</span>
            <span v-if="showNameTail">{{ nameTail }}</span>
            <span
              v-if="gameState === 'escape'"
              class="escape-letter"
              aria-hidden="true"
            >
              {{ nameTail }}
            </span>
          </span>
          <button
            type="button"
            class="text-sm md:text-base px-3 py-1 rounded-full border border-slate-300/70 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-indigo-400/60 transition"
            @click="startGame"
            :disabled="gameState !== 'idle'"
            :aria-pressed="gameState !== 'idle'"
            aria-label="Play easter egg"
          >
            Play
          </button>
        </span>

        <div
          v-if="gameState !== 'idle'"
          ref="gameRef"
          class="absolute top-1/2 -translate-y-1/2 h-16 pointer-events-auto"
          :style="{ left: '-6vw', width: 'calc(100% + 6vw)' }"
          @pointerdown="jump"
        >
          <div class="absolute inset-x-0 bottom-1 h-px bg-slate-300/60 dark:bg-slate-700/60" />

          <div
            class="absolute bottom-1 left-0 font-bold select-none game-letter"
            v-if="gameState === 'playing' || gameState === 'caught'"
            :style="{ transform: `translate3d(0, ${playerY}px, 0)` }"
          >
            a
          </div>

          <div
            v-for="bar in obstacles"
            :key="bar.id"
            class="absolute bottom-1 bg-indigo-500/90 rounded-sm game-obstacle"
            :style="{
              width: `${bar.width}px`,
              height: `${bar.height}px`,
              left: '0px',
              transform: `translate3d(${bar.x}px, 0, 0)`
            }"
          />
        </div>
      </h1>

      <div
        v-if="gameState === 'caught'"
        class="mt-4 text-sm text-slate-500 dark:text-slate-400"
      >
        {{ t('hero.caught') }}
      </div>

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

    <div
      v-if="flash"
      class="flash-overlay"
      aria-hidden="true"
    />
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const { t } = useI18n()

const gameRef = ref(null)
const gameState = ref('idle')
const obstacles = ref([])
const playerY = ref(0)
const velocity = ref(0)
const rafId = ref(0)
const lastTime = ref(0)
const spawnTimer = ref(0)
const gameSize = ref({ width: 720, height: 240 })
const flash = ref(false)

const nameBase = computed(() => {
  const name = t('hero.name')
  return name.endsWith('a') ? name.slice(0, -1) : name
})

const nameTail = computed(() => {
  const name = t('hero.name')
  return name.endsWith('a') ? name.slice(-1) : ''
})

const showNameTail = computed(() => gameState.value === 'idle' || gameState.value === 'caught')

const measure = () => {
  if (!gameRef.value) return
  const rect = gameRef.value.getBoundingClientRect()
  gameSize.value = { width: rect.width, height: rect.height }
}

const PLAYER_SIZE = 24
const PLAYER_X = 24
const GROUND_OFFSET = 8

const resetGame = () => {
  obstacles.value = []
  playerY.value = 0
  velocity.value = 0
  spawnTimer.value = 0
  lastTime.value = 0
}

const startGame = () => {
  if (gameState.value !== 'idle') return
  gameState.value = 'escape'
  resetGame()
  setTimeout(() => {
    gameState.value = 'playing'
    requestAnimationFrame(loop)
  }, 520)
}

const endGame = (keepFlash = false) => {
  gameState.value = 'idle'
  cancelAnimationFrame(rafId.value)
  if (!keepFlash) {
    flash.value = false
  }
}

const jump = () => {
  if (gameState.value !== 'playing') return
  velocity.value = -320
}

const spawnObstacle = () => {
  const { width, height } = gameSize.value
  const minHeight = 40
  const maxHeight = Math.max(80, height - GROUND_OFFSET - 60)
  obstacles.value.push({
    id: `bar-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    x: width + 20,
    width: 16,
    height: Math.floor(minHeight + Math.random() * (maxHeight - minHeight))
  })
}

const loop = (time) => {
  rafId.value = requestAnimationFrame(loop)
  if (gameState.value !== 'playing') return

  if (!lastTime.value) lastTime.value = time
  const dt = Math.min(0.032, (time - lastTime.value) / 1000)
  lastTime.value = time

  measure()

  const gravity = 900
  const ground = 0
  velocity.value += gravity * dt
  playerY.value = Math.min(ground, playerY.value + velocity.value * dt)
  if (playerY.value >= ground) {
    playerY.value = ground
    velocity.value = 0
  }

  spawnTimer.value += dt
  if (spawnTimer.value > 1.35) {
    spawnObstacle()
    spawnTimer.value = 0
  }

  const speed = 220
  obstacles.value = obstacles.value
    .map((bar) => ({ ...bar, x: bar.x - speed * dt }))
    .filter((bar) => bar.x + bar.width > -20)

  const playerRect = {
    x: PLAYER_X,
    y: gameSize.value.height - GROUND_OFFSET - PLAYER_SIZE + playerY.value,
    w: PLAYER_SIZE,
    h: PLAYER_SIZE
  }

  const hit = obstacles.value.some((bar) => {
    const barRect = {
      x: bar.x,
      y: gameSize.value.height - GROUND_OFFSET - bar.height,
      w: bar.width,
      h: bar.height
    }
    return (
      playerRect.x < barRect.x + barRect.w &&
      playerRect.x + playerRect.w > barRect.x &&
      playerRect.y < barRect.y + barRect.h &&
      playerRect.y + playerRect.h > barRect.y
    )
  })

  if (hit) {
    gameState.value = 'caught'
    flash.value = true
    endGame(true)
    setTimeout(() => {
      flash.value = false
    }, 3000)
  }
}

const onKeydown = (event) => {
  if (event.code === 'Space') {
    event.preventDefault()
    jump()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', measure)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', measure)
  cancelAnimationFrame(rafId.value)
})
</script>
