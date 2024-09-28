<script setup lang="ts">
import { provide, reactive } from 'vue'

import ProvideInjectExperience from './ProvideInjectExperience.vue'
import SubVueComponentWithInject from './SubVueComponentWithInject.vue'

const obj = reactive({
  a: 1,
})
const bululu = ref(1)
provide('awiwi', obj)
provide('bululu', bululu)
provide('test', '❌ Precendence is incorrect')
function onClick() {
  obj.a++
  bululu.value++
}
</script>

<template>
  <button @click="onClick">Click me </button>
  <SubVueComponentWithInject />
  <ProvideInjectExperience />
</template>
