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
  <div class="mb-4">
    <button
      class="
        flex
        items-center
        justify-between
        w-full
        py-2
        px-4
        bg-gray-100
        border-none
        text-gray-400
        font-bold
        text-xs
        font-sans
        cursor-pointer
      "
      :aria-expanded="isOpen"
      aria-haspopup="true"
      role="button"
      :data-folder="label"
      tabindex="0"
      @click="toggle"
    >
      <span>{{ label }}</span>
      <i :class="isOpen ? 'i-ic:baseline-keyboard-arrow-up' : 'i-ic:baseline-keyboard-arrow-down'" />
    </button>

    <Transition
      name="slide"
      enter-active-class=" animate-fade-in animate-duration-200 animate-ease-in-out"
      leave-active-class=" animate-fade-out animate-duration-200 animate-ease-in-out"
    >
      <div
        v-show="isOpen"
        class="bg-white rounded-b pt-4"
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
