<script setup lang="ts">
const props = defineProps<{
  isPass: boolean
  msg: string
}>()
</script>

<template>
  <span :class="props.isPass ? 'pass' : 'fail'">{{ props.isPass ? '✅' : '❌' }} {{ props.msg }}</span>
</template>

<style scoped>
.pass {
  color: green;
}
.fail {
  color: red;
}
</style>
