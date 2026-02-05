<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box, Edges, OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'abstractions-edges'

const gl = {
  powerPreference: 'high-performance',
  precision: 'highp',
  clearColor: '#F6B03B',
}

const { enabled, edgeColor, edgeThreshold } = useControls({
  enabled: { value: true, type: 'boolean', label: 'Enabled' },
  edgeColor: { value: '#292929', type: 'color', label: 'Color' },
  edgeThreshold: {
    label: 'Threshold Angle',
    value: 15,
    min: 1,
    max: 100,
    step: 1,
  },
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[0, 2, 5]"
    />

    <OrbitControls
      make-default
    />

    <TresGridHelper
      :args="[10, 10]"
      :position-y="-.5"
    />

    <Box :position="[-1, 0, 0]">
      <TresMeshBasicMaterial color="#f6f6f6" />

      <Edges
        v-if="enabled"
        :scale="1.1"
        :threshold="edgeThreshold"
      >
        <TresMeshBasicMaterial
          :color="edgeColor"
        />
      </Edges>
    </Box>

    <Box :position="[1, 0, 0]">
      <TresMeshBasicMaterial color="#292929" />

      <Edges
        :scale="1.1"
        :threshold="edgeThreshold.value"
        color="#f6f6f6"
      />
    </Box>
  </TresCanvas>
</template>
