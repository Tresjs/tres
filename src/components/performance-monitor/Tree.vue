<script setup lang="ts">
import { computed, reactive } from 'vue'
import Tree from './Tree.vue'

interface TreeItem {
  name: string
  slug?: string
  children?: TreeItem[]
  isOpen?: boolean
}
const props = withDefaults(defineProps<{
  items: Array<TreeItem>
  depth?: number
}>(), {
  depth: 0,
})

const fItems = computed(() => props.items?.map(item => reactive({
  ...item,
  isOpen: false,
})))

function toggle(item: TreeItem) {
  item.isOpen = !item.isOpen
}
</script>

<template>
  <div class="">
    <ul
      class="tl-list-none"
      :class="{ 'tl-pl-0': depth === 0 }"
      V-IF=""
    >
      <li
        v-for="(item, index) in fItems"
        :key="index"
        @click="toggle(item)"
      >
        <div class="tl-cursor-pointer tl-flex tl-items-center">
          <span class="tl-mr-2 tl-py-2 ">
            <svg
              :class="item.isOpen ? 'tl-transform tl-rotate-90' : ''"
              class="tl-w-4 tl-h-4 tl-transition-transform tl-text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
          {{ item.name }} 
        </div>
        
        <div
          v-show="item.isOpen"
          class="tl-border-l-2 tl-border-transparent tl-border-l-gray-200 tl-border-2 tl-border-solid tl-ml-2 tl-pl-4"
        >
          <slot
            :name="`depth-${depth}`"
            :item="item"
          >
            <!-- Default content if no slot is provided -->
            <Tree
              :items="item.children"
              :depth="depth + 1"
            />
          </slot>
        </div>
      </li>
    </ul>
  </div>
</template>

