<script setup lang="ts">
import { Align, OrbitControls } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
import { TresLeches, useControls } from '@tresjs/leches'

const { top, bottom, left, right, front, back } = useControls({
  top: false,
  bottom: false,
  left: false,
  right: false,
  front: false,
  back: false,
})
</script>

<template>
    <div class="aspect-16/9">
      <TresCanvas clear-color="#222">
        <TresPerspectiveCamera />
        <OrbitControls />

        <TresAxesHelper :scale="2" />

        <Align :top="top" :right="right" :back="back" :left="left" :bottom="bottom" :front="front">
          <TresMesh>
            <TresBoxGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </Align>
      </TresCanvas>
    </div>
  <TresLeches :float="false" />
</template>
