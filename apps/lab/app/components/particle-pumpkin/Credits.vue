<template>
  <div class="z-50 bottom-0 fixed flex justify-center w-screen sm:justify-start text-white">
    <div
      class="bg-[#282A36]/70 shadow-3xl m-2 md:m-10 px-5 py-3 sm:py-5 rounded-3xl backdrop-blur-sm flex-col flex gap-1.5 sm:gap-3 w-full max-w-md">
      <h1 class="text-2xl md:text-3xl font-bold">
        Halloween Pumpkin
      </h1>
      <p class="w-full  text-sm md:text-base">
        A 3D pumpkin made with Tres.js, a 3D library for Vue.js. This is a
        Halloween-themed demo that demonstrates
        particles, custom shaders, and glb models.
      </p>

      <div class="flex flex-row gap-3 md:gap-5">
        <NuxtLink to="https://twitter.com/@drew_ronsman" target="_blank" title="Twitter"
          class="flex items-center gap-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6 text-blue-500 hover:text-blue-400"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M22.46 5.88c-.8.36-1.64.6-2.52.71a4.26 4.26 0 001.86-2.34 8.5 8.5 0 01-2.69 1.03 4.23 4.23 0 00-7.2 3.85 12 12 0 01-8.73-4.42 4.23 4.23 0 001.31 5.65 4.2 4.2 0 01-1.92-.53v.05a4.22 4.22 0 003.38 4.13c-.7.2-1.44.24-2.16.1a4.22 4.22 0 003.93 2.92 8.5 8.5 0 01-5.26 1.8c-.34 0-.68-.02-1.02-.07a12.02 12.02 0 006.5 1.91c7.8 0 12.07-6.45 12.07-12.06l-.01-.55a8.54 8.54 0 002.09-2.18z" />
          </svg>
          <span class="hidden md:inline-block ml-1">Twitter</span>
        </NuxtLink>
        <NuxtLink to="https://github.com/NeoPrint3D/TresJsHalloweenPumpkin" target="_blank"
          title="Check out the code on GitHub" class="flex items-center gap-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            class="h-5 w-5 md:h-6 md:w-6 text-gray-500 hover:text-gray-600">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.111.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.204.084 1.838 1.236 1.838 1.236 1.07 1.838 2.809 1.305 3.495.998.109-.776.419-1.305.763-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.53 11.53 0 013.006-.405c1.023 0 2.05.137 3.006.405 2.292-1.552 3.297-1.23 3.297-1.23.646 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.623-5.475 5.917.42.36.81 1.096.81 2.216 0 1.6-.015 2.886-.015 3.276 0 .315.21.688.825.576C20.565 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          <span class="hidden md:inline-block ml-1">GitHub</span>
        </NuxtLink>
        <NuxtLink to="https://www.youtube.com/channel/UC_90-lqmmcymEHKNdZC1leA" target="_blank" title="YouTube"
          class="flex items-center gap-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6 text-red-500 hover:text-red-400"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21.77 7.74a2.74 2.74 0 00-1.94-1.94C18.77 5.4 12 5.4 12 5.4s-6.77 0-7.83.4a2.74 2.74 0 00-1.94 1.94c-.4 1.06-.4 4.26-.4 4.26s0 3.2.4 4.26a2.74 2.74 0 001.94 1.94c1.06.4 7.83.4 7.83.4s6.77 0 7.83-.4a2.74 2.74 0 001.94-1.94c.4-1.06.4-4.26.4-4.26s0-3.2-.4-4.26zM9.75 15.5V8.5l6.5 3-6.5 4z" />
          </svg>
          <span class="hidden md:inline-block ml-1">YouTube</span>
        </NuxtLink>
      </div>
      <NuxtLink to="https://dronsman.com" target="_blank"
        class="flex gap-1.5 items-center text-[#A4FFFF] hover:underline text-xs md:text-sm">
        <p class="text-center mt-2">
          Created by Drew Ronsman
        </p>
        <img class="w-6 md:w-8 translate-y-0.5" src="/dronsman-logo.svg">
      </NuxtLink>
    </div>
  </div>
</template>
