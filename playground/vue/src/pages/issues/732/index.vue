<script setup lang="ts">
import { provide, reactive } from 'vue'

import ProvideInjectExperience from './ProvideInjectExperience.vue'
import SubVueComponentWithInject from './SubVueComponentWithInject.vue'
import { injectSymbol } from './constants'

const obj = reactive({
  a: 1,
})
const bululu = ref(1)
const symbolInjection = computed(() => `Symbol injection is working  ${obj.a}`)
provide('awiwi', obj)
provide('bululu', bululu)
provide('test', '❌ Precendence is incorrect')
provide(injectSymbol, symbolInjection)
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
