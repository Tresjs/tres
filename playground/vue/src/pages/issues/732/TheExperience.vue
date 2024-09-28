<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { provide } from 'vue'
import ComponentWithInject from './ComponentWithInject.vue'

provide('test', '✅ Precedence is correct')
</script>

<template>
  <TresCanvas>
    <ComponentWithInject />
  </TresCanvas>
</template>
