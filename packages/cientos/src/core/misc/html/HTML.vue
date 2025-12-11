<script setup lang="ts">
import { useLoop, useTresContext } from '@tresjs/core'
import {
  DoubleSide,
  Matrix4,
  OrthographicCamera,
  PlaneGeometry,
  Quaternion,
  Raycaster,
  ShaderMaterial,
  Vector3,
} from 'three'

import {
  computed,
  createVNode,
  onUnmounted,
  ref,
  render,
  shallowRef,
  toRefs,
  useAttrs,
  watch,
  watchEffect,
} from 'vue'

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
  getViewportFactor,
  isObjectBehindCamera,
  isObjectVisible,
  objectScale,
  objectZIndex,
} from './utils'

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
  transparentMaterial?: boolean
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
  transparentMaterial: false,
  calculatePosition: () => defaultCalculatePosition,
})

const emits = defineEmits(['onOcclude'])

const slots = defineSlots()

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
  transparentMaterial,
  calculatePosition,
} = toRefs(props)

const attrs = useAttrs()

const groupRef = shallowRef<TresObject3D | null>(null)
const occlusionMeshRef = shallowRef<TresObject3D | null>(null)

const defaultPlaneGeometry = new PlaneGeometry()

const { renderer, scene, camera, sizes } = useTresContext()

const el = computed(() => document.createElement(as.value))

const raycaster = new Raycaster()
const tmpVec = new Vector3()
const tmpMatrix = new Matrix4()
const tmpQuat = new Quaternion()

const previousPosition = ref<[number, number, number]>([0, 0, 0])
const previousZoom = ref(0)
const vnode = ref<VNode | null>(null)

const isVisible = ref(true)
const isMeshSizeSet = ref(false)

const baseStyle = computed(() => ({
  position: 'absolute',
  top: '0',
  left: '0',
  willChange: 'transform',
  pointerEvents: pointerEvents.value,
  ...(typeof attrs.style === 'object' ? attrs.style : {}),
}))

const styles = computed(() => {
  const w = sizes.width.value
  const h = sizes.height.value

  if (transform.value) {
    return {
      ...baseStyle.value,
      transformStyle: 'preserve-3d',
      pointerEvents: 'none',
      width: `${w}px`,
      height: `${h}px`,
    }
  }

  return {
    ...baseStyle.value,
    transform: center.value ? 'translate3d(-50%,-50%,0)' : 'none',
    ...(fullscreen.value && {
      top: `-${h / 2}px`,
      left: `-${w / 2}px`,
      width: `${w}px`,
      height: `${h}px`,
    }),
    pointerEvents: fullscreen.value ? 'none' : pointerEvents.value,
  }
})

const transformInnerStyles = computed(() => ({
  position: 'absolute',
  pointerEvents: pointerEvents.value,
}))

const isRayCastOcclusion = computed(() => {
  const o = occlude.value
  return (
    o
    && o !== 'blending'
    && (Array.isArray(o) ? o.length && typeof o[0] !== 'boolean' : true)
  )
})

const effectiveMaterial = computed(() => {
  if (material.value) { return material.value }

  return new ShaderMaterial({
    vertexShader: sprite.value
      ? (vertexShader as string)
      : transform.value
        ? (passthroughVertex as string)
        : (vertexShader as string),
    fragmentShader: fragmentShader as string,
    side: DoubleSide,
    transparent: transparentMaterial.value,
    uniforms: {
      uWidth: { value: 1 },
      uHeight: { value: 1 },
    },
  })
})

watchEffect(() => {
  effectiveMaterial.value.transparent = transparentMaterial.value
})

watch(
  [occlude, () => renderer.instance],
  ([occludeVal, r]) => {
    if (!r || occludeVal !== 'blending') { return }
    const target = r.domElement
    target.style.zIndex = `${Math.floor(zIndexRange.value[0] / 2)}`
    target.style.position = 'absolute'
  },
  { immediate: true },
)

watch(
  () => [
    groupRef.value,
    renderer.instance,
    sizes.width.value,
    sizes.height.value,
    slots.default?.(),
    camera.activeCamera.value,
  ],
  ([group, r]) => {
    if (!group || !r || !camera.activeCamera.value) { return }

    isMeshSizeSet.value = false
    scene.value?.updateMatrixWorld()

    const elStyle = el.value.style
    elStyle.position = 'absolute'
    elStyle.top = '0'
    elStyle.left = '0'

    if (transform.value) {
      elStyle.pointerEvents = 'none'
      elStyle.overflow = 'hidden'
      elStyle.transformStyle = 'preserve-3d'
    }
    else {
      elStyle.transformOrigin = '0 0'
      elStyle.willChange = 'transform'
      if (!occlude.value) {
        elStyle.zIndex = `${zIndexRange.value[0]}`
      }
    }

    const parent = portal.value || r.domElement?.parentNode
    if (parent && !el.value.parentNode) {
      prepend.value ? parent.prepend(el.value) : parent.appendChild(el.value)
    }

    vnode.value = transform.value
      ? createVNode('div', { style: styles.value }, [
          createVNode('div', { style: transformInnerStyles.value }, [
            createVNode(
              'div',
              {
                key: groupRef.value?.uuid,
                class: attrs.class,
                style: attrs.style,
              },
              slots.default?.(),
            ),
          ]),
        ])
      : createVNode(
          'div',
          {
            key: groupRef.value?.uuid,
            style: styles.value,
            class: attrs.class,
          },
          slots.default?.(),
        )

    render(vnode.value, el.value)
  },
)

watchEffect(() => {
  if (wrapperClass.value) { el.value.className = wrapperClass.value }
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ invalidate }) => {
  const group = groupRef.value
  const cam = camera.activeCamera.value
  const rend = renderer.instance

  if (!group || !cam || !rend) { return }

  cam.updateMatrixWorld()
  group.updateWorldMatrix(true, false)

  const width = sizes.width.value
  const height = sizes.height.value
  const widthHalf = width * 0.5
  const heightHalf = height * 0.5

  const newPos = transform.value
    ? previousPosition.value
    : calculatePosition.value(group, cam as TresCamera, {
        width,
        height,
      })

  const posChanged
    = Math.abs(previousZoom.value - cam.zoom) > eps.value
      || Math.abs(previousPosition.value[0] - newPos[0]) > eps.value
      || Math.abs(previousPosition.value[1] - newPos[1]) > eps.value
      || Math.abs(previousPosition.value[2] - newPos[2]) > eps.value

  let changed = transform.value || posChanged

  let visible = true
  const behind = isObjectBehindCamera(group, cam)

  if (isRayCastOcclusion.value) {
    let targets: TresObject3D[] | false = false

    if (Array.isArray(occlude.value)) {
      targets = occlude.value as TresObject3D[]
    }
    else if (occlude.value !== 'blending') {
      targets = [scene.value as unknown as TresObject3D]
    }

    if (targets) {
      visible = isObjectVisible(group, cam, raycaster, targets) && !behind
    }
  }
  else {
    visible = !behind
  }

  if (visible !== isVisible.value) {
    isVisible.value = visible
    el.value.style.display = visible ? 'block' : 'none'
    emits('onOcclude', !visible)
    changed = true
  }

  const halfRange = Math.floor(zIndexRange.value[0] / 2)
  const zRange = occlude.value
    ? isRayCastOcclusion.value
      ? [zIndexRange.value[0], halfRange]
      : [halfRange - 1, 0]
    : zIndexRange.value

  el.value.style.zIndex = `${objectZIndex(group, cam, zRange)}`

  if (transform.value) {
    const persp = cam.projectionMatrix.elements[5] * heightHalf
    const camMatrix = getCameraCSSMatrix(cam.matrixWorldInverse)
    const isOrtho = cam instanceof OrthographicCamera

    const cameraTransform = isOrtho
      ? `scale(${persp})translate(${epsilon(-(cam.right + cam.left) / 2)}px,${epsilon(
        (cam.top + cam.bottom) / 2,
      )}px)`
      : `translateZ(${persp}px)`

    let finalMatrix = group.matrixWorld

    if (sprite.value) {
      tmpMatrix.copy(group.matrixWorld)

      const invCamMat = cam.matrixWorldInverse.clone().transpose()
      tmpQuat.setFromRotationMatrix(invCamMat)
      tmpMatrix.makeRotationFromQuaternion(tmpQuat)

      group.getWorldPosition(tmpVec)
      tmpMatrix.setPosition(tmpVec)

      tmpMatrix.scale(group.scale)

      tmpMatrix.elements[3] = tmpMatrix.elements[7] = tmpMatrix.elements[11] = 0
      tmpMatrix.elements[15] = 1

      finalMatrix = tmpMatrix
    }

    const style = el.value.style
    style.width = `${width}px`
    style.height = `${height}px`
    style.perspective = isOrtho ? '' : `${persp}px`

    if (vnode.value?.el) {
      vnode.value.el.style.transform = `${cameraTransform}${camMatrix}translate(${widthHalf}px,${heightHalf}px)`

      let inner: VNode | undefined
      if (Array.isArray(vnode.value.children)) {
        inner = vnode.value.children[0] as VNode
      }
      if (inner?.el) {
        inner.el.style.transform = getObjectCSSMatrix(
          finalMatrix,
          1 / ((distanceFactor.value || 10) / 400),
        )
      }
    }
  }

  else {
    const scale
      = distanceFactor.value === undefined
        ? 1
        : objectScale(group, cam) * distanceFactor.value

    el.value.style.transform = `translate3d(${newPos[0]}px,${newPos[1]}px,0) scale(${scale})`
  }

  previousPosition.value = [newPos[0], newPos[1], newPos[2]]
  previousZoom.value = cam.zoom

  if (!isRayCastOcclusion.value && occlusionMeshRef.value && !isMeshSizeSet.value) {
    const mesh = occlusionMeshRef.value

    if (transform.value) {
      const vnodeRoot = vnode.value
      const children = vnodeRoot?.children

      if (Array.isArray(children)) {
        const childVNode = children[0] as VNode
        const element = childVNode?.el as HTMLElement

        if (element) {
          const isOrtho = cam instanceof OrthographicCamera

          if (isOrtho && geometry.value && attrs.scale) {
            if (!Array.isArray(attrs.scale)) {
              mesh.scale.setScalar(1 / (attrs.scale as number))
            }
            else if (attrs.scale instanceof Vector3) {
              mesh.scale.copy(attrs.scale)
            }
            else {
              mesh.scale.set(
                1 / attrs.scale[0],
                1 / attrs.scale[1],
                1 / attrs.scale[2],
              )
            }
          }
          else if (!isOrtho && !geometry.value) {
            const ratio = (distanceFactor.value || 10) / 400

            if (sprite.value) {
              effectiveMaterial.value.uniforms.uWidth.value = element.clientWidth * ratio
              effectiveMaterial.value.uniforms.uHeight.value
                = element.clientHeight * ratio

              mesh.lookAt(cam.position)
              mesh.scale.set(1, 1, 1)
            }
            else {
              const w = element.clientWidth * ratio
              const h = element.clientHeight * ratio
              mesh.scale.set(w, h, 1)
            }
          }

          isMeshSizeSet.value = true
        }
      }
    }

    else {
      const element = el.value.children[0] as HTMLElement

      if (element?.clientWidth && element?.clientHeight) {
        group.getWorldPosition(tmpVec)

        const factor = getViewportFactor(cam, tmpVec, { width, height })
        const ratio = 1 / factor

        effectiveMaterial.value.uniforms.uWidth.value
          = element.clientWidth * ratio
        effectiveMaterial.value.uniforms.uHeight.value
          = element.clientHeight * ratio

        mesh.scale.set(1, 1, 1)
        mesh.lookAt(cam.position)

        isMeshSizeSet.value = true
      }
    }
  }

  if (changed) { invalidate() }
})

onUnmounted(() => {
  defaultPlaneGeometry?.dispose()
  effectiveMaterial.value?.dispose()

  if (el.value?.parentNode) {
    el.value.parentNode.removeChild(el.value)
  }
})

defineExpose({
  instance: groupRef,
  isVisible,
  occlusionMesh: occlusionMeshRef,
})
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
