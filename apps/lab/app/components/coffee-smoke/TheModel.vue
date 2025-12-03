<script setup lang="ts">

const { nodes } = useGLTF('/models/coffee-smoke/coffee-mug-table-baked.glb', { draco: true })

const mug = computed(() => nodes.value.mug)

const table = computed(() => nodes.value.table)

const coffee = computed(() => nodes.value.coffee)
</script>
<template>
  <primitive v-if="mug" :object="mug" />
  <primitive v-if="table" :object="table" />
  <primitive v-if="coffee" :object="coffee" />
</template>