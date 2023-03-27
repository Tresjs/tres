<script lang="ts">
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three-stdlib'

extend({ OrbitControls })
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
