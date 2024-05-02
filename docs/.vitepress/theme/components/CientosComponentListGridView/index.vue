<script setup lang="ts">
import componentList from '../../../../guide/componentList'
</script>

<template>
  <div class="grid md-grid-cols-3 sm-grid-cols-2">
    <template v-for="c, i of componentList" :key="i">
      <div>
        <h3>{{ c.text }}</h3>
        <ul class="text-sm">
          <li v-for="item, ii of c.items" :key="ii">
            <a :href="item.link">{{ item.text }}</a>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>
