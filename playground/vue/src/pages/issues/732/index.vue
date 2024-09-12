<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { provide, reactive } from 'vue'
import ProvideBridge from '../../../components/ProvideBridge.vue'
import SubComponentWithInject from './SubComponentWithInject.vue'
import SubVueComponentWithInject from './SubVueComponentWithInject.vue'

const obj = reactive({
  a: 1,
})
const bululu = ref(1)
provide('awiwi', obj)
provide('bululu', bululu)

function onClick() {
  obj.a++
  bululu.value++
}
</script>

<template>
  <button @click="onClick">Click me </button>
  <SubVueComponentWithInject />
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <ProvideBridge :keys-values="{ myKey: obj }">
      <SubComponentWithInject />
    </ProvideBridge>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
