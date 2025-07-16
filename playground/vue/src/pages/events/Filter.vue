<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ThreeEvent, TresObject } from '@tresjs/core'
import type { Intersection, Object3D } from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, Color, NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#202020',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

function getIntersectionIndexForObject(intersections: Intersection[], object: TresObject) {
  const objects = intersections.map(i => i.object)
  return objects.indexOf(object as Object3D)
}

function clamp(a: number, b: number, v: number) { return Math.max(a, Math.min(b, v)) }
function invLerp(a: number, b: number, v: number) { return clamp(0, 1, (v - a) / (b - a)) }
function onPointerup(ev: ThreeEvent<PointerEvent>) {
  const i = getIntersectionIndexForObject(ev.intersections, ev.eventObject) / ev.intersections.length
  const r = 1 - invLerp(0, 0.75, i)
  const g = 0
  const b = invLerp(0.25, 1, i)
  ev.eventObject.material.color.set(new Color(r, g, b))
}

function onPointermissed(ev: ThreeEvent<PointerEvent>) {
  ev.eventObject.material.color.set(new Color('#444'))
}

const boxesContainerRef = shallowRef()

function getAllBoxes(): TresObject[] {
  return boxesContainerRef.value?.children ?? []
}

const FILTERS: Record<string, ((intrs: Intersection[]) => Intersection[]) | undefined> = {
  undefined,
  '() => []': (_intersections: Intersection[]) => [],
  'intrs => intrs.reverse()': (intersections: Intersection[]) => intersections.reverse(),
  'intrs => intrs.filter((_, i) => !!(i % 2))': (intersections: Intersection[]) => intersections.filter((intr, i) => !!(i % 2)),
  'intrs => intrs.filter(intr => intr.object.scale.x < 0.75)': (intersections: Intersection[]) => intersections.filter(intr => intr.object.scale.x < 0.75),
  'intrs => intrs.sort((a, b) => a.object.position.z - b.object.position.z)': (intersections: Intersection[]) => intersections.sort((intrA, intrB) => intrA.object.position.z - intrB.object.position.z),
  'intrs => intrs.sort((a, b) => b.object.scale.x - a.object.scale.x)': (intersections: Intersection[]) => intersections.sort((intrA, intrB) => intrB.object.scale.x - intrA.object.scale.x),
  'intrs => intrs.sort((a, b) => distSqToCam(b) - distSqToCam(a))': (intersections: Intersection[]) => intersections.sort((intrA, intrB) => distSqToCam(intrB) - distSqToCam(intrA)),
}

const FILTER_IDS = Object.keys(FILTERS)
const filterFnIdRef = ref<keyof typeof FILTERS>('undefined')

const eventsFns = {
  filter: FILTERS[filterFnIdRef.value],
  // NOTE: We're going to "lie" and pretend that all boxes were hit.
  // Normally this function will raycast and return intersections with "hit" objects.
  // But we'll just return all objects as `{ object }`, a Partial<Intersection>.
  // We're going to "lie" and pretend that's an Intersection as well.
  //
  // We'll use something like THREE's default sort after raycasting, which
  // returns objects closest to the camera first.
  getIntersections: () => getAllBoxes().map(object => ({ object } as Intersection)).sort(closestToCamera),
}

function closestToCamera(intrA: Intersection, intrB: Intersection) { return distSqToCam(intrA) - distSqToCam(intrB) }
function onChangeFilterId(id: keyof typeof FILTERS) {
  filterFnIdRef.value = id
  eventsFns.filter = FILTERS[filterFnIdRef.value]
}

const cameraRef = ref<Object3D | undefined>(undefined)
function distSqToCam(intersection: Intersection<Object3D>) {
  return cameraRef.value ? cameraRef.value.position.distanceToSquared(intersection.object.position) : 1
}
</script>

<template>
  <OverlayInfo>
    <h1><code>filter</code></h1>
    <p>context.eventManager has a settable <code>filter</code> function. It allows you to sort and filter intersections before they are handled, possibly sorting intersections to process important "hits" earlier.</p>
    <p>The filter can be set by passing a filter function on <code>TresCanvas</code> like:</p>
    <code>&lt;TresCanvas :events="{filter: {{ filterFnIdRef }}}" /&gt;</code>
    <hr />
    <h2>Example filters</h2>
    <p><strong>Select a filter and then click on the canvas to see its effect.</strong> (In this demo, all on-screen objects will be "hit" by any click on the canvas.)</p>
    <div v-for="id of FILTER_IDS" :key="id">
      <input :id="id" :checked="id === filterFnIdRef" type="radio" name="target" @change="() => onChangeFilterId(id)" />
      <label :for="id">{{ id }}</label>
    </div>
    <ul>
      <li>Intersection objects towards the <span class="red">front</span> of the filtered array are <span class="red">redder</span>.</li>
      <li>Intersection objects towards the <span class="blue">end</span> of the filtered array are <span class="blue">blue</span>.</li>
      <li>Objects filtered out appear in gray</li>
    </ul>
    <hr />
    <h2>Preview (after click)</h2>
    <img src="data:image/png;base64,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" />
  </OverlayInfo>
  <TresCanvas
    window-size
    v-bind="gl"
    :events="eventsFns"
  >
    <TresPerspectiveCamera
      ref="cameraRef"
      :position="[15, 15, 15]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresGroup ref="boxesContainerRef">
      <template v-for="x in [10, 8, 6, 4, 2, 0, -2, -4, -6, -8, -10]">
        <TresMesh
          v-for="z in [10, 8, 6, 4, 2, 0, -2, -4, -6, -8, -10]"
          :key="`${z},${x}`"
          :scale="(Math.sin(x * 0.5) * Math.sin(z * 0.5) * 0.8 + 1.1)"
          :position="[x, 0, z]"
          @pointerup="onPointerup"
          @pointermissed="onPointermissed"
        >
          <TresBoxGeometry :args="[1, 1, 1]" />
          <TresMeshToonMaterial color="#efefef" />
        </TresMesh>
      </template>
    </TresGroup>
    <TresDirectionalLight :intensity="1" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<style scoped>
.red {
  color: #f00;
}
.blue {
  color: #00f;
}
</style>
