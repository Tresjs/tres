<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Bounds, Grid, OrbitControls } from '@tresjs/cientos'
import { Vector3 } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import { computed, shallowRef } from 'vue'

const c = useControls({
  duration: { value: 0.5, min: 0, max: 10, step: 0.25 },
  offset: { value: 1, min: -2, max: 2, step: 0.25 },
  clip: false,
  useMounted: true,
  useOrthographic: false,
  useResize: false,
  isLinear: false,
  enabled: true,
  lookAtX: { value: 0, min: -20, max: 20, step: 0.10 },
  lookAtY: { value: 0, min: -20, max: 20, step: 0.10 },
  lookAtZ: { value: 0, min: -20, max: 20, step: 0.10 },
  moveToX: { value: -5, min: -20, max: 20, step: 0.10 },
  moveToY: { value: -5, min: -20, max: 20, step: 0.10 },
  moveToZ: { value: 5, min: -20, max: 20, step: 0.10 },
  upX: { value: 0, min: -1, max: 1, step: 0.10 },
  upY: { value: -1, min: -1, max: 1, step: 0.10 },
  upZ: { value: 0, min: -1, max: 1, step: 0.10 },
})

const { sin, cos, PI } = Math
const positions = Array.from(
  { length: 8 },
  (_, i) => new Vector3(cos(i * PI / 4) * 4, sin(i * PI / 4) * 4, 0),
)

const easingFn = computed(() => c.isLinear.value.value ? (n: number) => n : undefined)

const boundsRef = shallowRef()

const startArg = shallowRef('')
const cancelArg = shallowRef('')
const endArg = shallowRef('')

const startCount = shallowRef(0)
const cancelCount = shallowRef(0)
const endCount = shallowRef(0)

const onStartFn = (v: any) => { startArg.value = v.object?.uuid; startCount.value++ }
const onCancelFn = (v: any) => { cancelArg.value = v.object?.uuid; cancelCount.value++ }
const onEndFn = (v: any) => { endArg.value = v.object?.uuid; endCount.value++ }
</script>

<template>
  <TresLeches />
  <OverlayInfo>
    <h1>Bounds</h1>
    <h2>Setup</h2>
    <p>In this scene, multiple objects are children of <code>&lt;Bounds/&gt;</code>. A <code>pointerup</code> on a child should move/rotate the camera to fit the child into the view.</p>
    <h2>lookAt(lookAt?, position?, up?)</h2>
    <p><code>&lt;Bounds&gt;</code> has a <code>fit</code> method that can be called imperatively.</p>
    <button
      @pointerup="() => boundsRef.instance.lookAt(
        new Vector3(c.lookAtX.value.value, c.lookAtY.value.value, c.lookAtZ.value.value),
      )"
    >
      lookAt(new Vector(lookAtArgs))
    </button><br />
    <button
      @pointerup="() => boundsRef.instance.lookAt(
        [c.lookAtX.value.value, c.lookAtY.value.value, c.lookAtZ.value.value],
      )"
    >
      lookAt([lookAtArgs])
    </button><br />
    <button
      @pointerup="() => boundsRef.instance.lookAt(
        [c.lookAtX.value.value, c.lookAtY.value.value, c.lookAtZ.value.value],
        [c.moveToX.value.value, c.moveToY.value.value, c.moveToZ.value.value],
      )"
    >
      lookAt([lookAtArgs], [moveToArgs])
    </button><br />
    <button
      @pointerup="() => boundsRef.instance.lookAt(
        undefined,
        [c.moveToX.value.value, c.moveToY.value.value, c.moveToZ.value.value],
      )"
    >
      lookAt(undefined, [moveToArgs])
    </button><br />
    <button
      @pointerup="() => boundsRef.instance.lookAt(
        undefined,
        [c.moveToX.value.value, c.moveToY.value.value, c.moveToZ.value.value],
        [c.upX.value.value, c.upY.value.value, c.upZ.value.value],
      )"
    >
      lookAt(undefined, [moveToArgs], [upArgs])
    </button><br />
    <button @pointerup="() => boundsRef.instance.lookAt()">lookAt()</button><br />
    <h2>Callback results</h2>
    <p>onStart ({{ startCount }})</p>
    {{ startArg }}
    <hr />
    <p>onCancel ({{ cancelCount }})</p>
    {{ cancelArg }}
    <hr />
    <p>onEnd ({{ endCount }})</p>
    {{ endArg }}
    <h2>Testing Notes</h2>
    <p>OrbitControls zoom using an Orthographic camera can result in parts of the scene appearing "cut off", independent of <code>&lt;Bounds/&gt;</code></p>
    <p>Switching between Orthographic and Perspective Cameras leads to odd behavior, independent of <code>&lt;Bounds/&gt;</code>. To test, change <code>isOrthographicCamera</code>'s value, save and reload the page.</p>
    <p>The <code>clip</code> option sets the camera's clipping to a large multiple of the internal <code>distance</code>. To test, change the component's coefficient to a smaller number.</p>
  </OverlayInfo>
  <TresCanvas render-mode="on-demand">
    <TresOrthographicCamera v-if="c.useOrthographic.value.value" :position="[-5, 5, 5]" :zoom="1" :args="[-400, 400, 400, -400, 0, 10000]" />
    <TresPerspectiveCamera v-else :position="[5, 5, 5]" />
    <OrbitControls make-default />
    <TresGroup>
      <Bounds
        v-if="c.enabled.value.value"
        ref="boundsRef"
        :clip="c.clip.value.value"
        :duration="c.duration.value.value"
        :offset="c.offset.value.value"
        :use-resize="c.useResize.value.value"
        :use-mounted="c.useMounted.value.value"
        :easing="easingFn"
        @start="onStartFn"
        @cancel="onCancelFn"
        @end="onEndFn"
      >
        <TresMesh
          v-for="p, i of positions"
          :key="i"
          :position="p"
          @pointer-up="(e) => boundsRef.instance.lookAt(e.object)"
        >
          <TresBoxGeometry />
          <TresMeshNormalMaterial />
        </TresMesh>
      </Bounds>
    </TresGroup>
    <Grid :scale="20" :cell-size=".1" :section-size="0.3" section-color="#AAF" :infinite-grid="true" />
  </TresCanvas>
</template>
