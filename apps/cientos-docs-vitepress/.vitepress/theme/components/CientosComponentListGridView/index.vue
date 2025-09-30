<script setup lang="ts">
import componentList, { icons } from '../../../../component-list/components'
</script>

<template>
  <div class="grid md-grid-cols-3 sm-grid-cols-2">
    <template v-for="c, i of componentList" :key="i">
      <div>
        <h3 class="text-sm">
          <div
            v-if="c.text.toLowerCase() in icons"
            class="inline-block text-2xl p-1 p-x-2 m-r-1 m-b-5 text-2xl bg-zinc-500/10 rounded"
          >
            {{ icons[c.text.toLowerCase()] }}
          </div>
          {{ c.text }}
        </h3>
        <div v-for="item, ii of c.items" :key="ii" class="m-b-2">
          <a :href="item.link"><span class="text-sm font-medium">{{ item.text }}</span></a>
        </div>
      </div>
    </template>
  </div>
</template>
