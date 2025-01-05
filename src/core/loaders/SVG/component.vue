<script setup lang="ts">
import { useLoader } from '@tresjs/core'
import { DoubleSide, ShapeGeometry, Vector2 } from 'three'
import { SVGLoader } from 'three-stdlib'
import { onUnmounted, shallowRef, toRefs, watch, watchEffect } from 'vue'
import type { LoaderProto, TresOptions } from '@tresjs/core'
import type { BufferGeometry, MeshBasicMaterialParameters } from 'three'
import type { SVGResult, SVGResultPaths } from 'three-stdlib'

const props = withDefaults(defineProps<SVGProps>(), { skipStrokes: false, skipFills: false, depth: 'renderOrder' })

// Create a wrapper around SVGLoader to make it compatible with TresJS loader interface
class TresSVGLoader extends SVGLoader {
  load(
    url: string | string[],
    onLoad: (result: SVGResult) => void,
    onProgress?: (event: ProgressEvent<EventTarget>) => void,
    onError?: (event: ErrorEvent) => void,
  ): void {
    // If url is an array, only use the first URL
    const singleUrl = Array.isArray(url) ? url[0] : url
    super.load(singleUrl, onLoad, onProgress, onError)
  }
}

interface SVGProps {
  /**
   *
   * The SVG data or path to an SVG file
   *
   * @type {string}
   * @required
   * @memberof SVGProps
   *
   */
  src: string
  /**
   *
   * Whether to draw strokes
   *
   * @type {boolean}
   * @default false
   * @memberof SVGProps
   *
   */
  skipStrokes?: boolean
  /**
   *
   * Whether to draw fills
   *
   * @type {boolean}
   * @default false
   * @memberof SVGProps
   *
   */
  skipFills?: boolean
  /**
   *
   * Fill material properties
   *
   * @type {MeshBasicMaterialParameters}
   * @default undefined
   * @memberof SVGProps
   *
   */
  fillMaterial?: MeshBasicMaterialParameters
  /**
   *
   * Stroke material properties
   *
   * @type {MeshBasicMaterialParameters}
   * @default undefined
   * @memberof SVGProps
   *
   */
  strokeMaterial?: MeshBasicMaterialParameters
  /**
   *
   * Fill Mesh properties
   *
   * @type {TresOptions}
   * @default undefined
   * @memberof SVGProps
   *
   */
  fillMeshProps?: TresOptions
  /**
   *
   * Stroke Mesh properties
   *
   * @type {TresOptions}
   * @default undefined
   * @memberof SVGProps
   *
   */
  strokeMeshProps?: TresOptions
  /**
   *
   * Depth type
   * How should the resulting meshes and materials be rendered?
   * 'renderOrder' disables `depthWrite` and sets the `renderOrder` of each layer.
   * 'flat' disables `depthWrite` on materials.
   * 'offsetZ' enables `depthWrite` and inserts a small distance between each layer on the z-axis to avoid z-fighting.
   * number is treated the same as 'offsetZ'; the number is used as the distance between layers
   *
   * depthWrite documentation: https://threejs.org/docs/#api/en/materials/Material.depthWrite
   * renderOrder documentation: https://threejs.org/docs/?q=mesh#api/en/core/Object3D.renderOrder
   *
   * @type { 'renderOrder' | 'flat' | 'offsetZ' | number }
   * @default 'renderOrder'
   * @memberof SVGProps
   *
   */
  depth?: 'renderOrder' | 'flat' | 'offsetZ' | number
}

interface SVGLayer { geometry: BufferGeometry, material: MeshBasicMaterialParameters, isStroke: boolean }

const { src, skipStrokes, skipFills, fillMaterial, strokeMaterial, fillMeshProps, strokeMeshProps, depth } = toRefs(props)
const svgRef = shallowRef()
const layers = shallowRef([] as SVGLayer[])
const paths = shallowRef([] as SVGResultPaths[])

defineExpose({ instance: svgRef })

watchEffect(async () => useSVG(src.value).then(SVGResult => paths.value = SVGResult.paths))
watch([skipFills, skipStrokes, fillMaterial, strokeMaterial, paths], updateLayers)

async function useSVG(src: string) {
  const srcStr = !src.startsWith('<svg') ? src : encodeURI(`data:image/svg+xml;utf8,${src}`)
  return useLoader(TresSVGLoader as unknown as LoaderProto<SVGResult>, srcStr) as Promise<SVGResult>
}

onUnmounted(dispose)

function dispose() {
  layers.value.forEach(layer => layer.geometry.dispose())
}

function updateLayers() {
  dispose()

  const _layers = []

  const [depthWrite, offsetZ] = (() => {
    const DEPTH_WRITE = { flat: false, renderOrder: false, offsetZ: true }
    const OFFSET_Z = { flat: 0, renderOrder: 0, offsetZ: 0.025 }
    const d = depth.value
    return typeof d === 'number' ? [true, d] : [DEPTH_WRITE[d], OFFSET_Z[d]]
  })()

  let i = 0

  for (const path of paths.value) {
    const style = path.userData?.style ?? {}
    const fillMaterial = (Object.assign({
      color: style.fill,
      opacity: style.fillOpacity,
      transparent: true,
      side: DoubleSide,
      depthWrite,
    }, props.fillMaterial))
    if (!skipFills.value && style.fill !== undefined && style.fill !== 'none') {
      for (const shape of SVGLoader.createShapes(path)) {
        const geometry = new ShapeGeometry(shape)
        geometry.scale(1, -1, 1)
        if (offsetZ) { geometry.translate(0, 0, (i++) * offsetZ) }
        _layers.push({
          geometry,
          material: fillMaterial,
          isStroke: false,
        })
      }
    }
    if (!skipStrokes.value && style.stroke !== undefined && style.stroke !== 'none') {
      const material = (Object.assign({
        color: path.userData?.style.stroke,
        opacity: path.userData?.style.strokeOpacity,
        transparent: true,
        side: DoubleSide,
        depthWrite,
      }, props.strokeMaterial))
      for (const subPath of path.subPaths) {
        const points = subPath.getPoints().map(v2 => new Vector2(v2.x, -v2.y))
        const geometry = SVGLoader.pointsToStroke(points, style || 'none')
        if (offsetZ) {
          geometry.translate(0, 0, (i++) * offsetZ)
        }
        _layers.push({
          geometry,
          material,
          isStroke: true,
        })
      }
    }
  }

  layers.value = _layers
}
</script>

<template>
  <TresGroup ref="svgRef">
    <TresMesh
      v-for="({ geometry, material, isStroke }, i) of layers"
      :key="`${i}`"
      v-bind="isStroke ? strokeMeshProps : fillMeshProps"
      :geometry="geometry"
      :render-order="depth === 'renderOrder' ? i : 0"
    >
      <TresMeshBasicMaterial v-bind="material" />
    </TresMesh>
  </TresGroup>
</template>
