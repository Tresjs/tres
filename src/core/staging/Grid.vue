<script setup lang="ts">
import { shaderMaterial } from '../../utils/shaderMaterial'
import type { ColorRepresentation, PlaneGeometry, ShaderMaterial, Side, Uniform } from 'three'
import { BackSide, Color, Mesh, Plane, Vector3 } from 'three'
import { extend, useLoop } from '@tresjs/core'
import { shallowRef } from 'vue'

/**
       Based on
      https://github.com/Fyrestar/THREE.InfiniteGridHelper by https://github.com/Fyrestar
      and https://github.com/threlte/threlte/blob/main/packages/extras/src/lib/components/Grid/Grid.svelte
      by https://github.com/grischaerbe and https://github.com/jerzakm
*/

export interface GridMaterialType {
  /** Cell size, default: 0.5 */
  cellSize?: number
  /** Cell thickness, default: 0.5 */
  cellThickness?: number
  /** Cell color, default: black */
  cellColor?: ColorRepresentation
  /** Section size, default: 1 */
  sectionSize?: number
  /** Section thickness, default: 1 */
  sectionThickness?: number
  /** Section color, default: #2080ff */
  sectionColor?: ColorRepresentation
  /** Follow camera, default: false */
  followCamera?: boolean
  /** Display the grid infinitely, default: false */
  infiniteGrid?: boolean
  /** Fade distance, default: 100 */
  fadeDistance?: number
  /** Fade strength, default: 1 */
  fadeStrength?: number
  /** Fade from camera (1) or origin (0), or somewhere in between, default: camera */
  fadeFrom?: number
  /** Material side, default: THREE.BackSide */
  side?: Side
}

export type GridProps = GridMaterialType & {
  /** Default plane-geometry arguments */
  args?: ConstructorParameters<typeof PlaneGeometry>
}

const props = withDefaults(defineProps<GridProps>(), {
  cellColor: '#000000',
  sectionColor: '#0000ff',
  cellSize: 0.5,
  sectionSize: 1,
  followCamera: false,
  infiniteGrid: false,
  fadeDistance: 100,
  fadeStrength: 1,
  fadeFrom: 1,
  cellThickness: 0.5,
  sectionThickness: 1,
  side: BackSide,
})

const GridMaterial = shaderMaterial(
  {
    cellSize: 0.5,
    sectionSize: 1,
    fadeDistance: 100,
    fadeStrength: 1,
    fadeFrom: 1,
    cellThickness: 0.5,
    sectionThickness: 1,
    cellColor: new Color(),
    sectionColor: new Color(),
    infiniteGrid: false,
    followCamera: false,
    worldCamProjPosition: new Vector3(),
    worldPlanePosition: new Vector3(),
  },
  /* glsl */ `
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  /* glsl */ `
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
)
extend({ GridMaterial })

const ref = shallowRef<Mesh>(new Mesh())
const plane = new Plane()
const upVector = new Vector3(0, 1, 0)
const zeroVector = new Vector3(0, 0, 0)

const { onBeforeRender } = useLoop()

onBeforeRender((state) => {
  if (!state.camera) { return }
  plane.setFromNormalAndCoplanarPoint(upVector, zeroVector).applyMatrix4(ref.value.matrixWorld)

  const gridMaterial = ref.value.material as ShaderMaterial
  const worldCamProjPosition = gridMaterial.uniforms.worldCamProjPosition as Uniform<Vector3>
  const worldPlanePosition = gridMaterial.uniforms.worldPlanePosition as Uniform<Vector3>

  plane.projectPoint(state.camera.value!.position, worldCamProjPosition.value)
  worldPlanePosition.value.set(0, 0, 0).applyMatrix4(ref.value.matrixWorld)
})
</script>

<template>
  <TresMesh ref="ref" :frustum-culled="false">
    <TresGridMaterial
      :transparent="true"
      :extensions-derivatives="true"
      :side="props.side"
      :cell-size="props.cellSize"
      :section-size="props.sectionSize"
      :cell-color="props.cellColor"
      :section-color="props.sectionColor"
      :cell-thickness="props.cellThickness"
      :section-thickness="props.sectionThickness"
      :fade-distance="props.fadeDistance"
      :fade-strength="props.fadeStrength"
      :fade-from="props.fadeFrom"
      :infinite-grid="props.infiniteGrid"
      :follow-camera="props.followCamera"
    />
    <TresPlaneGeometry :args="props.args" />
  </TresMesh>
</template>
