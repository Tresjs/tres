<script setup lang="ts">
import { useLoop, useTresContext } from '@tresjs/core'
import type {
  OrthographicCamera,
} from 'three'
import {
  DoubleSide,
  PlaneGeometry,
  Raycaster,
  ShaderMaterial,
  Vector3,
} from 'three'
import { computed, createVNode, isRef, onUnmounted, ref, render, shallowRef, toRefs, useAttrs, watch, watchEffect } from 'vue'
import type { TresCamera, TresObject3D } from '@tresjs/core'
import type { Mutable } from '@vueuse/core'

import type { VNode } from 'vue'
import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'
import passthroughVertex from './shaders/passthrough-vertex.glsl'
import {
  calculatePosition as defaultCalculatePosition,
  epsilon,
  getCameraCSSMatrix,
  getObjectCSSMatrix,
  isObjectBehindCamera,
  isObjectVisible,
  objectScale,
  objectZIndex,
} from './utils'

export interface HTMLProps {
  geometry?: any
  material?: any
  as?: string
  transform?: boolean
  prepend?: boolean
  portal?: Mutable<HTMLElement>
  wrapperClass?: string
  eps?: number
  distanceFactor?: number
  fullscreen?: boolean
  center?: boolean
  pointerEvents?: PointerEventsProperties
  sprite?: boolean
  zIndexRange?: Array<number>
  calculatePosition?: typeof defaultCalculatePosition

  // Occlusion based off work by Jerome Etienne and James Baicoianu
  // https://www.youtube.com/watch?v=ScZcUEDGjJI
  // as well as Joe Pea in CodePen: https://codepen.io/trusktr/pen/RjzKJx
  occlude?: TresObject3D | null | (TresObject3D | null)[] | boolean | 'blending'
  castShadow?: boolean // Enable shadow casting for the occlusion plane
  receiveShadow?: boolean // Enable shadow receiving for the occlusion plane
}

const props = withDefaults(defineProps<HTMLProps>(), {
  zIndexRange: () => [16777271, 0],
  as: 'div',
  transform: false,
  eps: 0.0001,
  pointerEvents: 'auto',
  sprite: false,
  prepend: false,
  castShadow: false,
  receiveShadow: false,
  calculatePosition: () => defaultCalculatePosition,
})

const emits = defineEmits(['onOcclude'])

const slots = defineSlots()

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

const groupRef = shallowRef<TresObject3D | null>(null)
const occlusionMeshRef = shallowRef<TresObject3D | null>(null)

const defaultPlaneGeometry = shallowRef(new PlaneGeometry())

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
  prepend,
  occlude,
  zIndexRange,
  castShadow,
  receiveShadow,
  calculatePosition,
} = toRefs(props)

const { renderer, scene, camera, sizes } = useTresContext()

const el = computed(() => document.createElement(as.value))

const previousPosition = ref([0, 0, 0])
const previousZoom = ref(0)
const vnode = ref<VNode>()
const raycaster = ref<Raycaster>(new Raycaster())

const styles = computed(() => {
  const baseStyles: any = {
    position: 'absolute',
    top: 0,
    left: 0,
    willChange: 'transform',
    pointerEvents: pointerEvents.value,
    ...Object.assign({}, attrs.style),
  }

  const w = sizes.width.value
  const h = sizes.height.value

  if (transform.value) {
    return {
      ...baseStyles,
      transformStyle: 'preserve-3d',
      pointerEvents: 'none',
      width: `${w}px`,
      height: `${h}px`,
    }
  }
  else {
    return {
      ...baseStyles,
      transform: center.value ? 'translate3d(-50%,-50%,0)' : 'none',
      ...(fullscreen.value && {
        top: `-${h / 2}px`,
        left: `-${w / 2}px`,
        width: `${w}px`,
        height: `${h}px`,
      }),
      pointerEvents: fullscreen.value ? 'none' : pointerEvents.value,
    }
  }
})

const transformInnerStyles = computed(() => ({
  position: 'absolute',
  pointerEvents: pointerEvents.value,
}))

const isMeshSizeSet = ref(false)

const isRayCastOcclusion = computed(
  () =>
    (occlude?.value && occlude?.value !== 'blending')
    || (Array.isArray(occlude?.value) && occlude?.value.length && isRef(occlude.value[0])),
)

watch(
  [occlude, () => renderer.instance],
  ([occludeVal, rendererVal]) => {
    if (!rendererVal || occludeVal === false) { return }

    const target = rendererVal.domElement

    if (occludeVal && occludeVal === 'blending') {
      target.style.zIndex = `${Math.floor(zIndexRange.value[0] / 2)}`
      target.style.position = 'absolute'
    }
    else {
      // IMPORTANT:
      // Do NOT restore zIndex / position / pointerEvents here.
      // These properties should ONLY be modified when occlusion="blending".
      // Resetting them in other modes would overwrite user-defined canvas styles
      // and break the layout, event handling, or rendering order of the scene.
    }
  },
  { immediate: true },
)

watch(
  () => [groupRef.value, renderer.instance, sizes.width.value, sizes.height.value, slots.default?.(), camera.activeCamera.value],
  ([group, rendererInst]): void => {
    if (group && rendererInst && camera.activeCamera.value) {
      isMeshSizeSet.value = false
      scene.value?.updateMatrixWorld()

      // Initial positioning will be handled during the first render frame.
      if (transform.value) {
        el.value.style.position = 'absolute'
        el.value.style.top = '0'
        el.value.style.left = '0'
        el.value.style.pointerEvents = 'none'
        el.value.style.overflow = 'hidden'
        el.value.style.transformStyle = 'preserve-3d'
      }
      else {
        // For non-transform mode, we can set some base styles, but leave position calculation to the render loop
        el.value.style.position = 'absolute'
        el.value.style.top = '0'
        el.value.style.left = '0'
        el.value.style.transformOrigin = '0 0'
        el.value.style.willChange = 'transform'

        if (!occlude.value) {
          el.value.style.zIndex = `${zIndexRange.value[0]}`
        }
      }

      let mountTarget: HTMLElement | null = null
      if (portal?.value) {
        mountTarget = portal.value as HTMLElement
      }
      else { mountTarget = rendererInst.domElement?.parentNode as HTMLElement }

      if (mountTarget && !el.value.parentNode) {
        if (prepend.value) {
          mountTarget.prepend(el.value)
        }
        else { mountTarget.appendChild(el.value) }
      }

      if (transform.value) {
        vnode.value = createVNode('div', { id: 'outer', style: styles.value }, [
          createVNode('div', { id: 'inner', style: transformInnerStyles.value }, [
            createVNode('div', {
              key: groupRef.value?.uuid,
              id: `${scene?.value.uuid}`,
              class: attrs.class,
              style: attrs.style,
            }, slots.default?.()),
          ]),
        ])
      }
      else {
        vnode.value = createVNode('div', {
          key: groupRef.value?.uuid,
          id: `${scene?.value.uuid}`,
          style: styles.value,
          class: attrs.class,
        }, slots.default?.())
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

const isVisible = ref(true)

const { onBeforeRender } = useLoop()

onBeforeRender(({ invalidate }) => {
  let changed = false

  if (groupRef.value && camera.activeCamera.value && renderer.instance) {
    camera.activeCamera.value?.updateMatrixWorld()
    groupRef.value.updateWorldMatrix(true, false)

    const width = sizes.width.value || 0
    const height = sizes.height.value || 0

    const widthHalf = width / 2
    const heightHalf = height / 2

    const vector = transform.value
      ? previousPosition.value
      : calculatePosition.value(groupRef.value, camera.activeCamera.value as TresCamera, {
          width,
          height,
        })

    if (
      transform.value
      || Math.abs(previousZoom.value - (camera.activeCamera.value as TresCamera).zoom) > eps.value
      || Math.abs(previousPosition.value[0] - vector[0]) > eps.value
      || Math.abs(previousPosition.value[1] - vector[1]) > eps.value
      || Math.abs(previousPosition.value[2] - vector[2]) > eps.value
    ) {
      changed = true

      const isBehindCamera = isObjectBehindCamera(groupRef.value, camera.activeCamera.value as TresCamera)
      let raytraceTarget: null | undefined | boolean | TresObject3D[] = false
      if (isRayCastOcclusion.value) {
        if (Array.isArray(occlude?.value)) { raytraceTarget = occlude?.value as unknown as TresObject3D[] }
        else if (occlude?.value !== 'blending') { raytraceTarget = [scene.value as unknown as TresObject3D] }
      }
      const previouslyVisible = isVisible.value
      if (raytraceTarget) {
        const isCurrentlyVisible = isObjectVisible(groupRef.value, camera.activeCamera.value as TresCamera, raycaster.value, raytraceTarget as TresObject3D[])
        isVisible.value = isCurrentlyVisible && !isBehindCamera
      }
      else {
        isVisible.value = !isBehindCamera
      }
      if (previouslyVisible !== isVisible.value) {
        emits('onOcclude', !isVisible.value)
        el.value.style.display = isVisible.value ? 'block' : 'none'
      }

      const halfRange = Math.floor(zIndexRange.value[0] / 2)
      const zRange = occlude?.value
        ? isRayCastOcclusion.value ? [zIndexRange.value[0], halfRange] : [halfRange - 1, 0]
        : zIndexRange.value
      el.value.style.zIndex = `${objectZIndex(groupRef.value, camera.activeCamera.value as TresCamera, zRange)}`

      if (transform.value) {
        const fov = camera.activeCamera.value.projectionMatrix.elements[5] * heightHalf

        const { isOrthographicCamera, top, left, bottom, right } = camera.activeCamera.value as OrthographicCamera
        const cameraMatrix = getCameraCSSMatrix(camera.activeCamera.value.matrixWorldInverse)

        const cameraTransform = isOrthographicCamera
          ? `scale(${fov})translate(${epsilon(-(right + left) / 2)}px,${epsilon((top + bottom) / 2)}px)`
          : `translateZ(${fov}px)`

        let matrix = groupRef.value.matrixWorld
        if (sprite.value) {
          matrix = camera.activeCamera.value.matrixWorldInverse.clone().transpose().copyPosition(matrix).scale(groupRef.value.scale)
          matrix.elements[3] = matrix.elements[7] = matrix.elements[11] = 0
          matrix.elements[15] = 1
        }

        el.value.style.width = `${width}px`
        el.value.style.height = `${height}px`
        el.value.style.perspective = isOrthographicCamera ? '' : `${fov}px`

        if (vnode.value?.el && vnode.value?.children && Array.isArray(vnode.value.children)) {
          vnode.value.el.style.transform = `${cameraTransform}${cameraMatrix}translate(${widthHalf}px,${heightHalf}px)`

          const firstChild = vnode.value.children[0] as VNode
          if (firstChild && firstChild.el) {
            firstChild.el.style.transform = getObjectCSSMatrix(
              matrix,
              1 / ((distanceFactor?.value || 10) / 400),
            )
          }
        }
      }
      else {
        const scale = distanceFactor?.value === undefined
          ? 1
          : objectScale(groupRef.value, camera.activeCamera.value as TresCamera) * distanceFactor?.value

        el.value.style.transform = `translate3d(${vector[0]}px,${vector[1]}px,0) scale(${scale})`
      }
    }

    previousPosition.value = vector
    previousZoom.value = (camera.activeCamera.value as TresCamera).zoom
  }

  if (!isRayCastOcclusion.value && occlusionMeshRef.value && !isMeshSizeSet.value) {
    if (transform.value) {
      if (vnode.value?.el && vnode.value?.children) {
        const childVNode = (vnode.value.children as VNode[])[0]
        const childEl = childVNode?.el as HTMLElement | null
        if (childEl) {
          const { isOrthographicCamera } = camera.activeCamera.value as OrthographicCamera
          if ((isOrthographicCamera && geometry.value) && attrs.scale) {
            if (!Array.isArray(attrs.scale)) {
              occlusionMeshRef.value.scale.setScalar(1 / (attrs.scale as number))
            }
            else if (attrs.scale instanceof Vector3) {
              occlusionMeshRef.value.scale.copy(attrs.scale.clone())
            }
            else {
              occlusionMeshRef.value.scale.set(1 / attrs.scale[0], 1 / attrs.scale[1], 1 / attrs.scale[2])
            }
          }
          else if (!isOrthographicCamera && !geometry.value) {
            const ratio = (distanceFactor?.value || 10) / 400
            const w = childEl.clientWidth * ratio
            const h = childEl.clientHeight * ratio
            occlusionMeshRef.value.scale.set(w, h, 1)
          }
          isMeshSizeSet.value = true
        }
      }
    }
    else {
      const ele = el.value.children[0]
      if (ele?.clientWidth && ele?.clientHeight) {
        // TODO: Create factor value (1 / sizes.factor)
        // Ratio of canvas pixels to Three.js world units (size.width / viewport.width)
        const ratio = 1 / 1
        const w = ele.clientWidth * ratio
        const h = ele.clientHeight * ratio
        occlusionMeshRef.value.scale.set(w, h, 1)
        isMeshSizeSet.value = true
      }
      occlusionMeshRef.value.lookAt(camera.activeCamera.value?.position)
    }
  }

  if (changed) { invalidate() }
})

const effectiveMaterial = computed(() => {
  if (material.value) { return material.value }

  return new ShaderMaterial({
    vertexShader: transform.value ? (passthroughVertex as string) : (vertexShader as string),
    fragmentShader: fragmentShader as string,
    side: DoubleSide,
  })
})

onUnmounted(() => {
  defaultPlaneGeometry.value?.dispose?.()
  effectiveMaterial.value?.dispose?.()
  el.value.remove()
})

defineExpose({ instance: groupRef, isVisible, occlusionMesh: occlusionMeshRef })
</script>

<template>
  <TresGroup v-bind="$attrs" ref="groupRef">
    <template v-if="occlude && !isRayCastOcclusion">
      <TresMesh
        ref="occlusionMeshRef"
        :material="effectiveMaterial"
        :cast-shadow="castShadow"
        :receive-shadow="receiveShadow"
        :geometry="geometry || defaultPlaneGeometry"
      />
    </template>
  </TresGroup>
</template>
