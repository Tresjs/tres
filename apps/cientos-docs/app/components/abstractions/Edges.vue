<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { Box, ContactShadows, Edges, OrbitControls } from "@tresjs/cientos";
import { TresLeches, useControls } from "@tresjs/leches";

const gl = {
  clearColor: "#f6f6f6",
  alpha: false,
};

const { colorEdges } = useControls({
  colorEdges: "#505050"
});

const dataBoxes = ["#82DBC5", "#505050", "#F6B03B"];
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :position="[0, 2, 5]" />
      <OrbitControls make-default auto-rotate />

      <Box
        v-for="(x, index) in [-1.5, 0, 1.5]"
        :key="`docs-edges-demo-box-${index}`"
        :position="[x, 0, 0]"
      >
        <TresMeshBasicMaterial :color="dataBoxes[index]" />
        <Edges :color="colorEdges" />
      </Box>

      <ContactShadows :blur="2" :resolution="512" :opacity="0.25" :position-y="-1" />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
