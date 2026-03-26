<script setup lang="ts">
import { isRef, ref } from 'vue'
import type { LechesControlUnion } from '../types'
import ControlInput from './ControlInput.vue'

defineProps<{
  controls: LechesControlUnion[]
  label: string | number
}>()

const emit = defineEmits(['open'])

function onChange(value: string, control: LechesControlUnion) {
  if (isRef(control.value)) {
    control.value.value = value
  }
  else {
    control.value = value as any
  }
}

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('open', isOpen.value)
}
</script>

<template>
  <div class="tl-transition-all tl-duration-200 tl-ease-in-out" style="margin-bottom: var(--tl-unit-spacing);">
    <button
      class="
        tl-flex
        tl-items-center
        tl-justify-between
        tl-w-full
        tl-bg-gray-100
        dark:tl-bg-dark-300
        tl-border-none
        tl-text-gray-400
        dark:tl-text-gray-400
        tl-font-bold
        tl-font-sans
        tl-cursor-pointer
        tl-relative
        tl-z-10
      "
      style="padding: 0 var(--tl-h-padding * 2); height: var(--tl-unit-size); line-height: var(--tl-unit-size); font-size: var(--tl-font-size);"
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
          class="tl-bg-white dark:tl-bg-dark-300 tl-rounded-b"
          style="padding-top: var(--tl-v-padding); padding-bottom: var(--tl-v-padding);"
          role="menu"
        >
          <template v-for="subcontrol in controls" :key="subcontrol.label">
            <ControlInput :control="subcontrol" role="menuitem" @change="newValue => onChange(newValue, subcontrol)" />
          </template>
        </div>
      </Transition>
    </div>
  </div>
</template>
