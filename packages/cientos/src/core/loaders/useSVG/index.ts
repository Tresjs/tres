import type { TresLoaderOptions } from '@tresjs/core'
import { useLoader } from '@tresjs/core'
import { computed, type ComputedRef, type MaybeRef, type Ref } from 'vue'
import { DoubleSide, ShapeGeometry, Vector2 } from 'three'
import { SVGLoader } from 'three-stdlib'
import type { BufferGeometry, MeshBasicMaterialParameters } from 'three'
import type { SVGResult } from 'three-stdlib'

export interface UseSVGOptions {
  /**
   * Whether to skip rendering strokes
   * @type {boolean}
   * @default false
   */
  skipStrokes?: boolean
  /**
   * Whether to skip rendering fills
   * @type {boolean}
   * @default false
   */
  skipFills?: boolean
  /**
   * Fill material properties
   * @type {MeshBasicMaterialParameters}
   */
  fillMaterial?: MeshBasicMaterialParameters
  /**
   * Stroke material properties
   * @type {MeshBasicMaterialParameters}
   */
  strokeMaterial?: MeshBasicMaterialParameters
  /**
   * Depth type - how should the resulting meshes be rendered?
   * 'renderOrder' disables depthWrite and sets renderOrder of each layer
   * 'flat' disables depthWrite on materials
   * 'offsetZ' enables depthWrite and inserts small distance between layers
   * number is treated same as 'offsetZ' using the number as distance
   * @type {'renderOrder' | 'flat' | 'offsetZ' | number}
   * @default 'renderOrder'
   */
  depth?: 'renderOrder' | 'flat' | 'offsetZ' | number
}

export interface SVGLayer {
  geometry: BufferGeometry
  material: MeshBasicMaterialParameters
  isStroke: boolean
}

/**
 * Vue composable for loading SVG files in TresJS
 *
 * @remarks
 * This composable uses Three.js SVGLoader under the hood to load and process SVG files
 * into geometries and materials that can be rendered in a 3D scene.
 *
 * @example
 * ```ts
 * const { state: svg, layers } = useSVG('/path/to/file.svg', { skipStrokes: false })
 * ```
 *
 * @param {MaybeRef<string>} path - Path to the SVG file or SVG data string
 * @param {UseSVGOptions} options - Options for processing the SVG
 * @returns Object containing the SVG state, loading state, processed layers and disposal function
 */
export function useSVG(path: MaybeRef<string>, options: UseSVGOptions = {}): {
  state: Ref<SVGResult | null>
  isLoading: Ref<boolean>
  execute: (delay?: number, ...args: any[]) => Promise<SVGResult>
  layers: ComputedRef<SVGLayer[]>
  dispose: () => void
} {
  const {
    skipStrokes = false,
    skipFills = false,
    fillMaterial = {},
    strokeMaterial = {},
    depth = 'renderOrder',
  } = options

  // Convert SVG data to data URL if needed
  const processedPath = computed(() => {
    const pathValue = typeof path === 'string' ? path : path.value
    return !pathValue.startsWith('<svg')
      ? pathValue
      : encodeURI(`data:image/svg+xml;utf8,${pathValue}`)
  })

  const useLoaderOptions: TresLoaderOptions<SVGResult, true> = {}

  const result = useLoader(SVGLoader, processedPath, useLoaderOptions)

  /**
   * Process SVG paths into renderable layers
   */
  const layers = computed(() => {
    if (!result.state.value?.paths) { return [] }

    const _layers: SVGLayer[] = []
    const paths = result.state.value.paths

    // Determine depth settings
    const [depthWrite, offsetZ] = (() => {
      const DEPTH_WRITE = { flat: false, renderOrder: false, offsetZ: true }
      const OFFSET_Z = { flat: 0, renderOrder: 0, offsetZ: 0.025 }
      return typeof depth === 'number' ? [true, depth] : [DEPTH_WRITE[depth], OFFSET_Z[depth]]
    })()

    let layerIndex = 0

    for (const path of paths) {
      const style = path.userData?.style ?? {}

      // Process fills
      if (!skipFills && style.fill !== undefined && style.fill !== 'none') {
        const fillMat = {
          color: style.fill,
          opacity: style.fillOpacity,
          transparent: true,
          side: DoubleSide,
          depthWrite,
          ...fillMaterial,
        }

        for (const shape of SVGLoader.createShapes(path)) {
          const geometry = new ShapeGeometry(shape)
          geometry.scale(1, -1, 1) // Flip Y-axis for correct orientation

          if (offsetZ) {
            geometry.translate(0, 0, layerIndex * offsetZ)
          }

          _layers.push({
            geometry,
            material: fillMat,
            isStroke: false,
          })
          layerIndex++
        }
      }

      // Process strokes
      if (!skipStrokes && style.stroke !== undefined && style.stroke !== 'none') {
        const strokeMat = {
          color: style.stroke,
          opacity: style.strokeOpacity,
          transparent: true,
          side: DoubleSide,
          depthWrite,
          ...strokeMaterial,
        }

        for (const subPath of path.subPaths) {
          const points = subPath.getPoints().map(v2 => new Vector2(v2.x, -v2.y))
          const geometry = SVGLoader.pointsToStroke(points, style)

          if (offsetZ) {
            geometry.translate(0, 0, layerIndex * offsetZ)
          }

          _layers.push({
            geometry,
            material: strokeMat,
            isStroke: true,
          })
          layerIndex++
        }
      }
    }

    return _layers
  })

  /**
   * Dispose of all geometries to free memory
   */
  const dispose = () => {
    layers.value.forEach(layer => layer.geometry.dispose())
  }

  return {
    ...result,
    layers,
    dispose,
  }
}
