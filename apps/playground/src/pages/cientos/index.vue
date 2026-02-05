<script setup lang="ts">
import {
  abstractionsRoutes,
  controlsRoutes,
  loadersRoutes,
  materialsRoutes,
  miscRoutes,
  shapesRoutes,
  stagingRoutes,
} from '@/router/routes/cientos'
import { performanceRoutes } from '@/router/routes/cientos/performance';

const sections = [
  { icon: '📦', title: 'Abstractions', routes: abstractionsRoutes },
  { icon: '🕹️', title: 'Controls', routes: controlsRoutes },
  { icon: '🎭', title: 'Staging', routes: stagingRoutes },
  { icon: '⏳', title: 'Loaders', routes: loadersRoutes },
  { icon: '👔', title: 'Materials', routes: materialsRoutes },
  { icon: '🔷', title: 'Shapes', routes: shapesRoutes },
  { icon: '🛠️', title: 'Misc', routes: miscRoutes },
  { icon: '🚀', title: 'Performance', routes: performanceRoutes },
]
</script>

<template>
  <div
    class="
  container mx-auto max-w-3xl
  font-sans text-xs color-gray
  bg-white
  "
  >
    <div class="mx-4">
      <div
        class="
    mt-24 mb-12 justify-between text-center align-baseline items-center gap-6
    sm:mt-16 sm:mb-6 sm:text-left sm:flex sm:flex-row-reverse
    "
      >
        <div>
          <img
            src="/cientos.svg"
            alt="Cientos logo"
            class="max-w-36 sm:max-w-xs align-baseline"
          />
        </div>
        <div class="sm:w-2/3">
          <h1
            class="
        w-auto max-w-75 mx-auto text-5xl text-zinc-700 mb-3
        sm:mx-none sm:w-1/2 sm:max-w-72
        "
          >
            <span class="text-tres-cientos">Cientos</span> Playground
          </h1>
          <p class="text-lg">
            Testing zone for TresJS/Cientos components
          </p>
        </div>
      </div>
      <div class="text-center sm:text-left sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="{ title, routes, icon } in sections"
          :key="title"
          class="
          p-4 my-4 leading-normal size-m weight-600 bg-zinc-50 rounded
          sm:my-0
          "
        >
          <div class="inline-block p-2 p-x-3 m-b-3 text-2xl bg-zinc-200 rounded">
            {{ icon }}
          </div>
          <h2 class="text-sm p-0 m-0 mb-1.5 font-semibold text-zinc-600">
            {{ title }}
          </h2>
          <div
            v-for="route in routes"
            :key="route.name"
            class="link-wrapper"
          >
            <router-link
              class="no-underline text-zinc-700 visited:text-zinc-400 hover:text-cientos-blue"
              :to="route.path"
            >
              <span>{{ route.name }} </span>
            </router-link>
          </div>
        </div>
      </div>
      <footer class="py-8">
        <router-link to="/" class="font-mono block no-underline text-zinc-700 visited:text-zinc-400 hover:text-zinc-600">cd ../</router-link>
      </footer>
    </div>
  </div>
</template>
