<script setup lang="ts">
import { ref } from 'vue'
import ControlInput from './ControlInput.vue'
import { Control } from '../types'
defineProps<{
  control: Control
}>()

function onChange(value: string, control: Control) {
  control.value = value
}

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>
<template>
  <div>
    <button
      class="flex items-center justify-between w-full p-4 bg-gray-100 border-none text-gray-400 font-bold text-xs focus:outline-none font-sans cursor-pointer"
      @click="toggle"
    >
      <span>{{ control.label }}</span>
      <i :class="isOpen ? 'i-ic:baseline-keyboard-arrow-up' : 'i-ic:baseline-keyboard-arrow-down'"></i>
    </button>

    <Transition
      name="slide"
      enter-active-class=" animate-fade-in animate-duration-200 animate-ease-in-out"
      leave-active-class=" animate-fade-out animate-duration-200 animate-ease-in-out"
    >
      <div class="bg-white rounded-b pt-4" v-show="isOpen">
        <template v-for="subcontrol in control.controls" :key="subcontrol.label">
          <ControlInput :control="subcontrol" @change="newValue => onChange(newValue, subcontrol)" />
        </template>
      </div>
    </Transition>
  </div>
</template>
