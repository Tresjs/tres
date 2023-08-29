<script setup lang="ts">
import { shallowRef, toRefs, onUnmounted, watch, watchEffect } from 'vue'
import { TresOptions, useLoader } from '@tresjs/core'
import { SVGLoader, SVGResultPaths } from 'three-stdlib'
import { Vector3, DoubleSide, ShapeGeometry, MeshBasicMaterialParameters, BufferGeometry } from 'three'

interface SVGProps {
  /**
   * 
   * The SVG data or path to an SVG file
   * 
   * @type {string}
   * @required
   * @memberof SVGProps
   *
   **/
  src: string
  /**
   * 
   * Whether to draw strokes
   * 
   * @type {boolean}
   * @default false 
   * @memberof SVGProps
   *
   **/
  skipStrokes?: boolean
  /**
   * 
   * Whether to draw fills
   * 
   * @type {boolean}
   * @default false
   * @memberof SVGProps
   *
   **/
  skipFills?: boolean
  /**
   * 
   * Fill material properties
   * 
   * @type {MeshBasicMaterialParameters}
   * @default {}
   * @memberof SVGProps
   *
   **/
  fillMaterial?: MeshBasicMaterialParameters
  /**
   * 
   * Stroke material properties
   * 
   * @type {MeshBasicMaterialParameters}
   * @default {}
   * @memberof SVGProps
   *
   **/
  strokeMaterial?: MeshBasicMaterialParameters
  /**
   * 
   * Fill Mesh properties
   * 
   * @type {TresOptions}
   * @default {}
   * @memberof SVGProps
   *
   **/
  fillMeshProps?: TresOptions
  /**
   * 
   * Stroke Mesh properties
   * 
   * @type {TresOptions}
   * @default {}
   * @memberof SVGProps
   *
   **/
  strokeMeshProps?: TresOptions
}

const props = withDefaults(defineProps<SVGProps>(),
  { skipStrokes: false, skipFills: false }
);

type SVGLayer = { geometry: BufferGeometry, material: MeshBasicMaterialParameters, key: string, isStroke: boolean };

const { src, skipStrokes, skipFills, fillMaterial, strokeMaterial, fillMeshProps, strokeMeshProps } = toRefs(props);
const svgRef = shallowRef();
const layers = shallowRef([] as SVGLayer[]);
const paths = shallowRef([] as SVGResultPaths[]);

defineExpose({ value: svgRef });

watchEffect(async() => useSVG(src.value).then(SVGResult => paths.value = SVGResult.paths));
watch([skipFills, skipStrokes, fillMaterial, strokeMaterial, paths], updateLayers);

async function useSVG(src: string) {
  const srcStr = !src.startsWith('<svg') ? src : encodeURI(`data:image/svg+xml;utf8,${src}`);
  return useLoader(SVGLoader, srcStr);
};

onUnmounted(dispose);

function dispose() {
  layers.value.forEach(layer => layer.geometry.dispose());
}

function updateLayers() {
  dispose();
  const _layers = [];
  let i = 0;
  for (const path of paths.value) {
    const style = path.userData?.style ?? {};
    const fillMaterial = (Object.assign({
      color: style.fill,
      opacity: style.fillOpacity,
      transparent: true,
      side: DoubleSide,
      depthWrite: false
    },
      props.fillMaterial));
    if (!skipFills.value && style.fill !== undefined && style.fill !== 'none') {
      for (const shape of SVGLoader.createShapes(path)) {
        const geometry = new ShapeGeometry(shape);
        geometry.scale(1, -1, 1);
        _layers.push({
          geometry,
          material: fillMaterial,
          isStroke: false,
          key: '' + i++
        })
      }
    }
    if (!skipStrokes.value && style.stroke !== undefined && style.stroke !== 'none') {
      const material = (Object.assign({
        color: path.userData?.style.stroke,
        opacity: path.userData?.style.strokeOpacity,
        transparent: true,
        side: DoubleSide, depthWrite: false
      },
        props.strokeMaterial));
      for (const subPath of path.subPaths) {
        const points = subPath.getPoints().map(v2 => new Vector3(v2.x, -v2.y, 0));
        const geometry = SVGLoader.pointsToStroke(points, style || 'none');
        _layers.push({
          geometry,
          material,
          isStroke: true,
          key: '' + i++
        })
      }
    }
  }

  layers.value = _layers;
}

</script>

<template>
  <TresGroup ref="svgRef">
    <TresMesh v-for="{ geometry, material, isStroke, key } of layers" :key="key"
      v-bind="isStroke ? strokeMeshProps : fillMeshProps" :geometry="geometry">
      <TresMeshBasicMaterial v-bind="material" />
    </TresMesh>
  </TresGroup>
</template>
