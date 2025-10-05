<script setup lang="ts">
import { ref, computed } from 'vue'

const isOpen = ref(false)
const isMobile = computed(() => window.innerWidth < 768)
</script>

<template>
  <div class="the-info relative z-36">
    <Transition
      name="fade-overlay"
      enter-active-class="opacity-1 transition-opacity duration-200"
      leave-active-class="opacity-0 transition-opacity duration-200"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-gray-800 bg-opacity-50 cursor-pointer z-36"
        @click.self="isOpen = false"
      >
        <div
          :class="{
            'w-full h-screen': isMobile,
            'md:rounded-lg shadow-md': !isMobile,
          }"
          class="absolute z-36 p-4 bg-white top-0 left-0 md:bottom-20 md:right-10 md:top-20 md:left-auto overflow-auto md:min-width-70ch text-gray-600 md:text-sm"
        >
          <div
            v-if="isMobile"
            class="flex justify-end"
          >
            <button
              class="bg-white rounded-full p-2 text-xl text-gray-500 hover:text-gray-700 focus:outline-none"
              @click="isOpen = false"
            >
              <i class="i-carbon-close" />
            </button>
          </div>
          <div class="prose">
            <ContentSlot
              :use="$slots.default"
              unwrap="p"
            />
          </div>
        </div>
      </div>
    </Transition>

    <button
      class="bg-gray-600 hover:bg-gray-700 opacity-40 transition-color shadow-lg hover:shadow-xl infline-flex w-12 h-12 justify-center items-center rounded-full absolute bottom-2 right-2"
      @click="isOpen = !isOpen"
    >
      <span class="i-carbon-code" />
    </button>
  </div>
</template>
