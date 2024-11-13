<script setup lang="ts">
import { Camera, Light, Mesh, Clock, PlaneGeometry } from 'three';
import type { LightFn } from './fns/shaderToyLights';
import { shaderToySrc } from './fns/shaderToySrc';
import TheExperience from './TheExperience.vue'
import { TresCanvas } from '@tresjs/core';

type ShaderToyTarget = {
  shader: string
  title: string
  author: string
  description: string
  href: string
  lightFn: LightFn
  dimensions: { x: number, y: number }
  cameras: Camera[],
  lights: Light[],
  floor: Mesh,
  target: Mesh,
  name: string,
}

export type State = ShaderToyTarget & {
  i: number,
  shaderToyTargets: ShaderToyTarget[],
  clock: Clock,
  next: () => void
}

const state = reactive({
  shader: shaderToySrc.gamesOfSinus,
  title: 'ShaderToy Museum Lab',
  author: 'andretchen0',
  description: `Inspired by Cineshader, ShaderToy.com shaders applied to meshes using TresJS.
  Loading...`,
  href: '',
  lightFn: () => { },
  dimensions: { x: 1, y: 1 },
  cameras: [] as Camera[],
  lights: [] as Light[],
  floor: new Mesh(new PlaneGeometry()),
  target: new Mesh(),
  name: 'undefined',

  i: -1,
  shaderToyTargets: [] as ShaderToyTarget[],
  clock: new Clock(),
  next: click,
} as State)

state.clock.start()

provide('state', state)

function click() {
  state.i = state.shaderToyTargets.length ? ((state.i + 1) % state.shaderToyTargets.length) : -1

  const targetInfo: Partial<typeof state> = state.shaderToyTargets[state.i] ?? {}
  Object.assign(state, targetInfo)
}
</script>
<template>
  <Suspense>
    <div>
      <TextUi />
      <TresCanvas @pointerup="click" clear-color="#000" :anti-alias="false" window-size>
        <TheExperience />
      </TresCanvas>
    </div>
  </Suspense>
</template>