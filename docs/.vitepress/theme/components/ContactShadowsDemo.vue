<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { ContactShadows, Levioso, TorusKnot } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="white">
    <Levioso :speed="2" :range="[0, 0.7]" :rotation-factor="9">
      <TorusKnot :scale="0.45">
        <TresMeshNormalMaterial />
      </TorusKnot>
    </Levioso>
    <ContactShadows :position-y="-1" color="#335" :scale="20" />
  </TresCanvas>
</template>
