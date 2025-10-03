<script setup lang="ts">
import { ref } from 'vue'
import type { Control } from '../types'
import ControlInput from './ControlInput.vue'

defineProps<{
  controls: Control[]
  label: string | number
}>()

function onChange(value: string, control: Control) {
  control.value = value as any
}

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="tl-mb-4">
    <button
      class="
        tl-flex
        tl-items-center
        tl-justify-between
        tl-w-full
        tl-py-2
        tl-px-4
        tl-bg-gray-100
        tl-border-none
        tl-text-gray-400
        tl-font-bold
        tl-text-xs
        tl-font-sans
        tl-cursor-pointer
      "
      :aria-expanded="isOpen"
      aria-haspopup="true"
      role="button"
      :data-folder="label"
      tabindex="0"
      @click="toggle"
    >
      <span>{{ label }}</span>
      <i :class="isOpen ? 'i-ic:baseline-keyboard-arrow-up' : 'i-ic:baseline-keyboard-arrow-down'"></i>
    </button>

    <Transition
      name="slide"
      enter-active-class="tl-animate-fade-in tl-animate-duration-200 tl-animate-ease-in-out"
      leave-active-class="tl-animate-fade-out tl-animate-duration-200 tl-animate-ease-in-out"
    >
      <div
        v-show="isOpen"
        class="tl-bg-white tl-rounded-b tl-pt-4"
        role="menu"
      >
        <template
          v-for="subcontrol in controls"
          :key="subcontrol.label"
        >
          <ControlInput
            :control="subcontrol"
            role="menuitem"
            @change="newValue => onChange(newValue, subcontrol)"
          />
        </template>
      </div>
    </Transition>
  </div>
</template>
