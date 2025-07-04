<script setup lang="ts">
import { ref } from 'vue'
import type { LechesControlUnion } from '../types'
import ControlInput from './ControlInput.vue'

defineProps<{
  controls: LechesControlUnion[]
  label: string | number
}>()

const emit = defineEmits(['open'])

function onChange(value: string, control: LechesControlUnion) {
  control.value = value as any
}

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('open', isOpen.value)
}
</script>

<template>
  <div class="tl-mb-2 tl-transition-all tl-duration-400 tl-ease-in-out">
    <button
      class="
        tl-flex
        tl-items-center
        tl-justify-between
        tl-w-full
        tl-py-2
        tl-px-4
        tl-bg-gray-100
        dark:tl-bg-dark-300
        tl-border-none
        tl-text-gray-400
        dark:tl-text-gray-400
        tl-font-bold
        tl-text-xs
        tl-font-sans
        tl-cursor-pointer
        tl-relative
        tl-z-10
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

    <div class="tl-relative tl-overflow-hidden">
      <Transition
        name="slide"
        enter-active-class="tl-transition-[transform,opacity] tl-duration-200 tl-ease-out"
        enter-from-class="tl-origin-top tl-scale-y-0 tl-opacity-0"
        enter-to-class="tl-origin-top tl-scale-y-100 tl-opacity-100"
        leave-active-class="tl-transition-[transform,opacity] tl-duration-200 tl-ease-in"
        leave-from-class="tl-origin-top tl-scale-y-100 tl-opacity-100"
        leave-to-class="tl-origin-top tl-scale-y-0 tl-opacity-0"
      >
        <div
          v-show="isOpen"
          class="tl-bg-white dark:tl-bg-dark-300 tl-rounded-b tl-pt-4 tl-pb-2"
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
  </div>
</template>
