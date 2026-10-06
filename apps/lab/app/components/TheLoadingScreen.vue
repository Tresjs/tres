<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { DefaultLoadingManager } from 'three'

withDefaults(defineProps<{
  background?: string
  textColor?: string
}>(), {
  background: '#0a0a0a',
  textColor: '#ffffff',
})

const emit = defineEmits<{ hidden: [] }>()

// No await: async setup would need a <Suspense> boundary at every usage,
// without one Vue silently skips the component
const progress = ref(0)
const assetsReady = ref(false)
let started = false

// Experiments flagged `responsive: false` in their frontmatter only work in
// landscape, so phones get a rotate prompt before the scene is revealed.
const experiment = inject(EXPERIMENT_KEY, undefined)
const needsLandscape = computed(() => experiment?.value?.responsive === false)
// `pointer: coarse` keeps portrait desktop monitors out of this branch.
const isCoarsePointer = useIsPhone()
const isPortrait = useMediaQuery('(orientation: portrait)')
const isPortraitPhone = computed(() => isCoarsePointer.value && isPortrait.value)
const proceeded = ref(false)

type Phase = 'loading' | 'rotate' | 'ready' | 'hidden'
const phase = computed<Phase>(() => {
  if (!assetsReady.value) { return 'loading' }
  if (!needsLandscape.value || proceeded.value) { return 'hidden' }
  return isPortraitPhone.value ? 'rotate' : 'ready'
})

// Best-effort only: iPhone Safari has no element fullscreen and rejects,
// and orientation lock is Android-only and needs fullscreen first. The tap
// on Proceed/Continue is the only user gesture we get, so this is the moment.
async function enterFullscreen() {
  try {
    await document.documentElement.requestFullscreen()
    await screen.orientation.lock?.('landscape')
  }
  catch {}
}

// The leave fade keeps rendering for ~300ms after phase turns 'hidden'. Without this,
// a loading -> hidden jump would show the ready state during the fade.
const shownPhase = ref<Phase>('loading')
watch(phase, (p) => {
  if (p !== 'hidden') { shownPhase.value = p }
})

function proceed() {
  if (isCoarsePointer.value) { enterFullscreen() }
  proceeded.value = true
}

// Only promise fullscreen where it can happen: iPhone Safari lacks the API.
// Read on mount, `document` is not available during SSR.
const canFullscreen = ref(false)
onMounted(() => {
  canFullscreen.value = isCoarsePointer.value && !!document.fullscreenEnabled
})

// Keep the screen up for at least one full jump cycle so fast loads
// don't flash it for a few frames
const MIN_VISIBLE_MS = 700
const shownAt = Date.now()
let hideScheduled = false

function scheduleHide() {
  if (hideScheduled) { return }
  hideScheduled = true
  const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - shownAt))
  setTimeout(() => {
    // Already in landscape (or on desktop): no prompt, hide as usual
    if (!isPortraitPhone.value) { proceeded.value = true }
    assetsReady.value = true
  }, remaining)
}

useProgress().then((state) => {
  const onStart = DefaultLoadingManager.onStart
  DefaultLoadingManager.onStart = (...args) => {
    started = true
    onStart?.(...args)
  }
  watchEffect(() => {
    progress.value = state.progress.value
    if (state.hasFinishLoading.value) {
      scheduleHide()
    }
  })
})

onMounted(() => {
  // Assets served from memory cache (SPA revisit) never touch the
  // LoadingManager, dismiss if nothing started loading
  setTimeout(() => {
    if (!started) {
      scheduleHide()
    }
  }, 1500)
})
</script>

<template>
  <Transition
    leave-active-class="transition-opacity duration-500"
    leave-to-class="opacity-0"
    @after-leave="emit('hidden')"
  >
    <div v-show="phase !== 'hidden'"
         class="fixed inset-0 z-50 flex items-center justify-center"
         :style="{ backgroundColor: background,
                   color: textColor }"
    >
      <div v-if="shownPhase !== 'loading'" class="flex flex-col items-center gap-5 px-6 text-center font-mono">
        <div class="relative size-12" aria-hidden="true">
          <Transition
            mode="out-in"
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="scale-50 opacity-0"
            leave-active-class="transition duration-200 ease-in"
            leave-to-class="scale-50 opacity-0"
          >
            <UIcon v-if="shownPhase === 'rotate'" key="rotate" name="i-lucide-smartphone" class="rotate-hint size-12" />
            <UIcon v-else key="check" name="i-lucide-circle-check" class="size-12" />
          </Transition>
        </div>
        <p class="max-w-xs text-sm" role="status">
          {{ shownPhase === 'rotate'
            ? 'Rotate your phone to landscape for a better experience'
            : 'Ready when you are' }}
        </p>
        <button v-if="shownPhase === 'ready'"
                type="button"
                class="rounded-full border border-current px-6 py-2 text-sm transition-colors hover:bg-current/10"
                @click="proceed"
        >
          Proceed
        </button>
        <button v-else
                type="button"
                class="text-xs underline opacity-60 transition-opacity hover:opacity-100"
                @click="proceed"
        >
          Continue anyway
        </button>
        <p v-if="canFullscreen" class="text-xs opacity-60">
          Opens in fullscreen. Use back or swipe down to exit.
        </p>
      </div>
      <slot v-else :progress="progress">
        <div class="flex flex-col items-center gap-4 font-mono">
          <div class="flex flex-col items-center" aria-hidden="true">
            <svg width="28"
                 height="28"
                 viewBox="0 0 24 24"
                 fill="none"
                 class="cube-boy"
                 xmlns="http://www.w3.org/2000/svg"
            >
              <path fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24 2.00019C24 0.895625 23.1046 0.00019455 22 0.00019455H2C0.895431 0.00019455 0 0.895625 0 2.00019V22.0002C0 23.1048 0.89543 24.0002 2 24.0002H22C23.1046 24.0002 24 23.1048 24 22.0002V2.00019ZM4.75 18.55C4.19772 18.55 3.75 18.9977 3.75 19.55C3.75 20.1023 4.19772 20.55 4.75 20.55H19.4C19.9523 20.55 20.4 20.1023 20.4 19.55C20.4 18.9977 19.9523 18.55 19.4 18.55H4.75ZM8.85 12.0004C8.85 13.4087 7.70833 14.5504 6.3 14.5504C4.89167 14.5504 3.75 13.4087 3.75 12.0004C3.75 10.5921 4.89167 9.45039 6.3 9.45039C7.70833 9.45039 8.85 10.5921 8.85 12.0004ZM17.8498 14.5504C19.2581 14.5504 20.3998 13.4087 20.3998 12.0004C20.3998 10.5921 19.2581 9.45039 17.8498 9.45039C16.4415 9.45039 15.2998 10.5921 15.2998 12.0004C15.2998 13.4087 16.4415 14.5504 17.8498 14.5504Z"
                    fill="currentColor"
              />
            </svg>
            <div class="cube-boy-shadow w-6 h-1 rounded-full bg-current opacity-20"></div>
          </div>
          <p class="text-sm" role="status">
            Loading {{ progress }}%
          </p>
          <div class="w-48 h-1 rounded-full bg-current/20 overflow-hidden">
            <div class="h-full rounded-full bg-current transition-[width] duration-300 ease-out"
                 :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>
      </slot>
    </div>
  </Transition>
</template>

<style scoped>
/* Turn to landscape, hold, turn back: mimics the gesture we ask for */
.rotate-hint {
  animation: rotate-hint 2.4s ease-in-out infinite;
}

@keyframes rotate-hint {
  0%,
  20% {
    transform: rotate(0deg);
  }

  45%,
  75% {
    transform: rotate(90deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

.cube-boy {
  transform-origin: bottom center;
  animation: cube-jump 1.4s ease-in-out infinite;
}

.cube-boy-shadow {
  margin-top: 2px;
  animation: cube-shadow 1.4s ease-in-out infinite;
}

@keyframes cube-jump {
  0% {
    transform: translateY(0) scale(1, 1);
  }

  12% {
    transform: translateY(0) scale(1.15, 0.8);
  }

  35% {
    transform: translateY(-1.25rem) scale(0.92, 1.12) rotate(4deg);
  }

  50% {
    transform: translateY(-1.4rem) scale(1, 1) rotate(-3deg);
  }

  70% {
    transform: translateY(0) scale(1.2, 0.75);
  }

  82% {
    transform: translateY(-0.3rem) scale(0.98, 1.04);
  }

  92% {
    transform: translateY(0) scale(1.06, 0.94);
  }

  100% {
    transform: translateY(0) scale(1, 1);
  }
}

@keyframes cube-shadow {
  0%,
  12% {
    transform: scaleX(1.1);
    opacity: 0.25;
  }

  35%,
  50% {
    transform: scaleX(0.5);
    opacity: 0.08;
  }

  70% {
    transform: scaleX(1.2);
    opacity: 0.3;
  }

  100% {
    transform: scaleX(1);
    opacity: 0.2;
  }
}
</style>
