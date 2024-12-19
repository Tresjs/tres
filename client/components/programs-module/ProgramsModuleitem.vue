<script setup lang="ts">
import type { ProgramObject } from '~/types'

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
    class="text-sm text-gray-400 font-mono"
  >
    <div
      class="flex gap-2 items-end cursor-pointer pt2 mb2"
      @click="isExpanded = !isExpanded"
    >
      <span
        v-if="depth > 0"
        class="h-1 border-b border-gray-300 w-4"
      />
      <div class="flex gap-2 items-center -mb2.5">
        <i :class="item.icon" />
        <!-- <Icon :name="item.icon" /> -->
        <!-- <i :class="item.icon" /> -->{{ item.type }} <UBadge
          v-if="item.name "
          variant="soft"
        >
          {{ item.name }}
        </UBadge>
      </div>
    </div>
    <div
      v-if="isExpanded"
    >
      <div class="p4 text-gray-400 text-xs font-mono">
        <p class="text-xs font-bold text-gray-600 mb2">
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
