<script setup lang="ts">
import { Instance } from '@tresjs/cientos'

// No props threading, no render prop: these resolve their batch through inject,
// across the SFC boundary, exactly like --instance codegen output would.
</script>

<template>
  <TresGroup>
    <Instance name="Body" :position="[0, 0.6, 0]" />
    <Instance name="Body" :position="[0, 1.6, 0]" :scale="[0.6, 0.6, 0.6]" />
    <Instance name="Eye" :position="[-0.18, 1.7, 0.32]" />
    <Instance name="Eye" :position="[0.18, 1.7, 0.32]" />
  </TresGroup>
</template>
