<template>
  <div class="relative h-screen w-full overflow-hidden bg-gray-50">
    <!-- 3D Canvas Background -->
    <div class="absolute inset-0">
      <TresCanvas window-size clear-color="#f8fafc">
        <Experience />
        <TheScreenshot />
      </TresCanvas>
    </div>

    <!-- Content Overlay -->
    <div class="relative z-10 h-full flex flex-col">
      <!-- Header -->
      <header class="p-6 md:p-8">
        <div class="flex items-center justify-between">
          <!-- Logo/Icon -->
          <div class="w-12 h-12 flex items-center justify-center">
            <div class="w-8 h-8 rounded-full border-2 border-gray-800 relative">
              <div class="absolute inset-1 rounded-full border border-gray-800" />
              <div class="absolute top-1/2 left-1/2 w-1 h-1 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          
          <!-- Nav Text -->
          <div class="text-right text-sm text-gray-700 max-w-xs">
            Perfect for your next web, social or branding project
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 flex items-center px-6 md:px-8">
        <div class="w-full max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <!-- Left Content -->
            <div>
              <div class="mb-6">
                <p class="text-sm text-gray-600 mb-2">High res</p>
                <p class="text-sm text-gray-600 mb-2">grainy</p>
                <p class="text-sm text-gray-600 mb-2">abstract</p>
                <p class="text-sm text-gray-600">shapes.</p>
              </div>
              
              <h1 class="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 leading-none tracking-tight" style="font-family: 'Playfair Display', serif;">
                Grainy<br>
                Shapes
              </h1>
            </div>

            <!-- Right Content (3D space for blobs) -->
            <div class="relative">
              <!-- This space is filled by the 3D canvas -->
            </div>
          </div>
        </div>
      </main>

      <!-- Bottom Right Accent -->
      <div class="absolute bottom-8 right-8">
        <div class="w-24 h-24 rounded-full border border-gray-800 flex items-center justify-center">
          <div class="w-16 h-16 rounded-full border border-gray-800" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Experience from './Experience.vue'

// Load Google Font
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect', 
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap'
    }
  ]
})
</script>