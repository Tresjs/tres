<script setup lang="ts">
import type { VNode, Ref } from 'vue'
import { computed, createVNode, toRefs, render, watchEffect, ref, watch, useAttrs, isRef, onUnmounted } from 'vue'
import type {
  WebGLRenderer,
  OrthographicCamera } from 'three'
import {
  DoubleSide,
  PlaneGeometry,
  ShaderMaterial,
  Vector3 } from 'three'
import type { TresCamera, TresObject3D } from '@tresjs/core'
import { useRenderLoop, useTresContext } from '@tresjs/core'

import type { Mutable } from '@vueuse/core'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { 
  calculatePosition,
  isObjectBehindCamera,
  isObjectVisible,
  objectZIndex,
  getCameraCSSMatrix,
  epsilon,
  getObjectCSSMatrix,
  objectScale, 
} from './utils'

export interface HTMLProps {
  geometry?: any
  material?: any
  as?: string
  transform?: boolean
  portal?: Mutable<HTMLElement>
  wrapperClass?: string
  eps?: number
  distanceFactor?: number
  fullscreen?: boolean
  center?: boolean
  pointerEvents?: PointerEventsProperties
  sprite?: boolean
  zIndexRange?: Array<number>

  // Occlusion based off work by Jerome Etienne and James Baicoianu
  // https://www.youtube.com/watch?v=ScZcUEDGjJI
  // as well as Joe Pea in CodePen: https://codepen.io/trusktr/pen/RjzKJx
  /* occlude?: Ref<Ref<TresObject3D>>[] | boolean | 'raycast' | 'blending' */
  occlude?: Ref<TresObject3D>[] | boolean | 'raycast' | 'blending'
}

const props = withDefaults(defineProps<HTMLProps>(), {
  geometry: new PlaneGeometry(),
  zIndexRange: () => [16777271, 0],
  as: 'div',
  transform: false,
  eps: 0.0001,
  pointerEvents: 'auto',
  sprite: false,
})

const emits = defineEmits(['onOcclude'])

type PointerEventsProperties =
  | 'auto'
  | 'none'
  | 'visiblePainted'
  | 'visibleFill'
  | 'visibleStroke'
  | 'visible'
  | 'painted'
  | 'fill'
  | 'stroke'
  | 'all'
  | 'inherit'

const attrs = useAttrs()

const slots = defineSlots()

const groupRef = ref<TresObject3D>()
const meshRef = ref<TresObject3D>()

const {
  geometry,
  material,
  as,
  transform,
  portal,
  wrapperClass,
  eps,
  distanceFactor,
  fullscreen,
  center,
  pointerEvents,
  sprite,
  occlude,
  zIndexRange,
} = toRefs(props)

const { renderer, scene, camera, raycaster, sizes } = useTresContext()

const el = computed(() => document.createElement(as.value))

const previousPosition = ref([0, 0])
const previousZoom = ref(0)
const vnode = ref<VNode>()

const styles = computed(() => {
  if (transform.value) {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: `${sizes.width.value}px`,
      height: `${sizes.height.value}px`,
      transformStyle: 'preserve-3d',
      pointerEvents: 'none',
      zIndex: 2,
      willChange: 'transform',
    }
  }
  else {
    return {
      position: 'absolute',
      transform: center.value ? 'translate3d(-50%,-50%,0)' : 'none',
      ...(fullscreen.value && {
        top: -(sizes.height.value) / 2,
        left: -(sizes.width.value) / 2,
        width: `${sizes.width.value}px`,
        height: `${sizes.height.value}px`,
      }),
      zIndex: 2,
      ...attrs.style,
      willChange: 'transform',
    }
  }
})

const transformInnerStyles = computed(() => ({
  position: 'absolute',
  pointerEvents: pointerEvents.value,
}))

// Occlussion
const occlusionMeshRef = ref(null!)
const isMeshSizeSet = ref(false)

const isRayCastOcclusion = computed(
  () =>
    (occlude?.value && occlude?.value !== 'blending')
    || (Array.isArray(occlude?.value) && occlude?.value.length && isRef(occlude.value[0])),
)

watch(
  () => occlude,
  (value) => {
    if (value && value === 'blending') {
      el.value.style.zIndex = `${Math.floor(zIndexRange.value[0] / 2)}`
      el.value.style.position = 'absolute'
      el.value.style.pointerEvents = 'none'
    }
    else {
      el.value.style.zIndex = null!
      el.value.style.position = null!
      el.value.style.pointerEvents = null!
    }
  },
)

watch(
  () => [groupRef.value, renderer.value, sizes.width.value, sizes.height.value],
  ([group, _renderer]: [TresObject3D | null, WebGLRenderer]): void => {
    if (group && _renderer) {
      const target = portal?.value || _renderer.domElement
      scene.value?.updateMatrixWorld()

      if (transform.value) {
        el.value.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;'
      }
      else {
        const vector = calculatePosition(group, camera.value as TresCamera, {
          width: sizes.width.value,
          height: sizes.height.value,
        })
        el.value.style.cssText 
        = `position:absolute;top:0;left:0;transform:translate3d(${vector[0]}px,${vector[1]}px,0);transform-origin:0 0;`
      }

      if (target) {
        target.parentNode?.appendChild(el.value)
      }

      if (transform.value) {
        vnode.value = createVNode('div', { id: 'outer', style: styles.value }, [
          createVNode('div', { id: 'inner', style: transformInnerStyles.value }, [
            createVNode('div', { id: scene?.value.uuid, class: attrs.class, style: attrs.style }, slots.default?.()),
          ]),
        ])
      }
      else {
        vnode.value = createVNode('div', { id: scene?.value.uuid, style: styles.value }, slots.default?.())
      }
      render(vnode.value, el.value)
    }
  },
)

watchEffect(() => {
  if (wrapperClass?.value) {
    el.value.className = wrapperClass.value
  }
})

const visible = ref(true)

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (groupRef.value && camera.value && renderer.value) {
    camera.value?.updateMatrixWorld()
    groupRef.value.updateWorldMatrix(true, false)

    const vector = transform.value
      ? previousPosition.value
      : calculatePosition(groupRef.value, camera.value as TresCamera, {
        width: sizes.width.value || 0,
        height: sizes.height.value || 0,
      })

    if (
      transform.value
      || Math.abs(previousZoom.value - (camera.value as TresCamera).zoom) > eps.value
      || Math.abs(previousPosition.value[0] - vector[0]) > eps.value
      || Math.abs(previousPosition.value[1] - vector[1]) > eps.value
    ) {
      const isBehindCamera = isObjectBehindCamera(groupRef.value, camera.value as TresCamera)
      let raytraceTarget: null | undefined | boolean | TresObject3D[] = false

      if (isRayCastOcclusion.value) {
        if (Array.isArray(occlude?.value)) {
          raytraceTarget = occlude?.value
        }
        else if (occlude?.value !== 'blending') {
          raytraceTarget = [scene.value as unknown as TresObject3D]
        }
      }

      const previouslyVisible = visible.value

      if (raytraceTarget) {
        const isVisible = isObjectVisible(
          groupRef.value,
          camera.value as TresCamera,
          raycaster.value,
          raytraceTarget as TresObject3D[],
        )
        visible.value = isVisible && !isBehindCamera
      }
      else {
        visible.value = !isBehindCamera
      }

      if (previouslyVisible !== visible.value) {
        emits('onOcclude', !visible.value)
        el.value.style.display = visible.value ? 'block' : 'none'
      }

      const halfRange = Math.floor(zIndexRange.value[0] / 2)
      const zRange = occlude?.value
        ? isRayCastOcclusion.value //
          ? [zIndexRange.value[0], halfRange]
          : [halfRange - 1, 0]
        : zIndexRange.value

      el.value.style.zIndex = `${objectZIndex(groupRef.value, camera.value as TresCamera, zRange)}`
      el.value.style.willChange = 'transform'
      if (transform.value) {
        const [widthHalf, heightHalf] = [
          (sizes.width.value) / 2,
          (sizes.height.value) / 2,
        ]
        const fov = camera.value.projectionMatrix.elements[5] * heightHalf
        const { isOrthographicCamera, top, left, bottom, right } = camera.value as OrthographicCamera
        const cameraMatrix = getCameraCSSMatrix(camera.value.matrixWorldInverse)
        const cameraTransform = isOrthographicCamera
          ? `scale(${fov})translate(${epsilon(-(right + left) / 2)}px,${epsilon((top + bottom) / 2)}px)`
          : `translateZ(${fov}px)`
        let matrix = groupRef.value.matrixWorld
        if (sprite.value) {
          matrix = camera.value.matrixWorldInverse.clone().transpose().copyPosition(matrix).scale(groupRef.value.scale)
          matrix.elements[3] = matrix.elements[7] = matrix.elements[11] = 0
          matrix.elements[15] = 1
        }
        el.value.style.width = `${sizes.width.value}px`
        el.value.style.height = `${sizes.height.value}px`
        el.value.style.perspective = isOrthographicCamera ? '' : `${fov}px`

        if (vnode.value?.el && vnode.value?.children) {
          vnode.value.el.style.willChange = 'transform'
          vnode.value.el.style.transform = `${cameraTransform}${cameraMatrix}translate(${widthHalf}px,${heightHalf}px)`
          vnode.value.children[0].willChange = 'transform'
          vnode.value.children[0].el.style.transform = getObjectCSSMatrix(
            matrix,
            1 / ((distanceFactor?.value || 10) / 400),
          )
        }
      }
      else {
        const scale
          = distanceFactor?.value === undefined
            ? 1
            : objectScale(groupRef.value, camera.value as TresCamera) * distanceFactor?.value
        el.value.style.transform = `translate3d(${vector[0]}px,${vector[1]}px,0) scale(${scale})`
      }
    }

    previousPosition.value = vector
    previousZoom.value = (camera.value as TresCamera).zoom
  }

  if (!isRayCastOcclusion.value && meshRef.value && !isMeshSizeSet.value) {
    if (transform.value) {
      if (vnode.value?.el && vnode.value?.children) {
        const el = vnode.value?.children[0]

        if (el?.clientWidth && el?.clientHeight) {
          const { isOrthographicCamera } = camera.value as OrthographicCamera

          if (isOrthographicCamera || geometry) {
            if (attrs.scale) {
              if (!Array.isArray(attrs.scale)) {
                meshRef.value.scale.setScalar(1 / (attrs.scale as number))
              }
              else if (attrs.scale instanceof Vector3) {
                meshRef.value.scale.copy(attrs.scale.clone().divideScalar(1))
              }
              else {
                meshRef.value.scale.set(1 / attrs.scale[0], 1 / attrs.scale[1], 1 / attrs.scale[2])
              }
            }
          }
          else {
            const ratio = (distanceFactor?.value || 10) / 400
            const w = el.clientWidth * ratio
            const h = el.clientHeight * ratio

            meshRef.value.scale.set(w, h, 1)
          }

          isMeshSizeSet.value = true
        }
      }
    }
    else {
      const ele = el.value.children[0]

      if (ele?.clientWidth && ele?.clientHeight) {
        const ratio = 1 / 1
        const w = ele.clientWidth * ratio
        const h = ele.clientHeight * ratio

        meshRef.value.scale.set(w, h, 1)

        isMeshSizeSet.value = true
      }

      occlusionMeshRef.value.lookAt(camera.value?.position)
    }
  }
})

//TODO: Check ShaderMaterial disposal
const shaders = computed(() => ({
  vertexShader: transform.value
    ? undefined
    : vertexShader,
  fragmentShader,
}))

const shaderMaterial = computed(() => {
  const shader = shaders.value
  return (
    material.value
    || new ShaderMaterial({
      vertexShader: shader.vertexShader as string,
      fragmentShader: shader.fragmentShader as string,
      side: DoubleSide,
    })
  )
})

onUnmounted(() => {
  if (shaderMaterial.value) {
    shaderMaterial.value.dispose()
  }
})
</script>

<template>
  <TresGroup ref="groupRef">
    <template v-if="occlude && !isRayCastOcclusion">
      <TresMesh
        ref="meshRef"
        :geometry="geometry"
        :material="shaderMaterial"
      />
    </template>
  </TresGroup>
</template>
