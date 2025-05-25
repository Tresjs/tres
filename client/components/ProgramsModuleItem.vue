<script setup lang="ts">
import type { ProgramObject } from '../types'
import { ref } from '#imports'

withDefaults(defineProps<{
  item: ProgramObject
  depth?: number
}>(), {
  depth: 0,
})

const isExpanded = ref(false)
</script>

<template>
  <div
    class="text-sm dark:text-gray-400 text-gray-500 font-mono"
  >
    <div
      class="flex gap-2 items-end cursor-pointer pt2 mb2"
      @click="isExpanded = !isExpanded"
    >
      <span
        v-if="depth > 0"
        class="h-1 border-b dark:border-gray-400 border-gray-500 w-4"
      />
      <div class="flex gap-2 items-center -mb2.5">
        <i :class="item.icon" />
        <!-- <Icon :name="item.icon" /> -->
        <!-- <i :class="item.icon" /> -->{{ item.type }} <UBadge
          v-if="item.name"
          variant="soft"
        >
          {{ item.name }}
        </UBadge>
      </div>
    </div>
    <div
      v-if="isExpanded"
    >
      <div class="p4 dark:text-gray-400 text-gray-500 text-xs font-mono">
        <p class="text-xs font-bold dark:text-gray-300/80 text-gray-700/80 mb2 op-80">
          Uniforms
        </p>
        <div
          v-for="[key, value] in Object.entries(item.uniforms.map)"
          :key="key"
        >
          {{ key }} <UBadge
            color="gray"
            variant="soft"
          >
            {{ value?.cache[value?.cache.length - 1] }}
          </UBadge>
        </div>
      </div>
    </div>
  </div>
</template>
