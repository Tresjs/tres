import { useLoop } from '@tresjs/core'
import type { Material, Texture } from 'three'
import { TextureLoader } from 'three'
import type { ShallowRef } from 'vue'
import { computed, onScopeDispose, shallowRef, toRefs, watch } from 'vue'
import { useMaterialNeedsUpdate } from '../../../utils/useMaterialNeedsUpdate'
import type { PrecipitationProps } from './props'

function useTextureProp(source: () => string | Texture | null | undefined) {
  const texture = shallowRef<Texture | null>(null)
  const loader = new TextureLoader()
  let loaded: Texture | null = null

  // Dispose a loaded texture only once the ref points elsewhere, or the next render uploads it again.
  const replace = (next: Texture | null, nextLoaded: Texture | null) => {
    const previous = loaded
    loaded = nextLoaded
    texture.value = next
    previous?.dispose()
  }

  watch(source, (value, _, onCleanup) => {
    if (typeof value !== 'string') {
      replace(value ?? null, null)
      return
    }
    let stale = false
    onCleanup(() => { stale = true })
    loader.load(value, (result) => {
      if (stale) {
        result.dispose()
        return
      }
      replace(result, result)
    })
  }, { immediate: true })

  onScopeDispose(() => loaded?.dispose())

  return texture
}

export function usePrecipitation(
  props: Required<Pick<PrecipitationProps, 'area' | 'count' | 'speed' | 'randomness'>> & PrecipitationProps,
  material: ShallowRef<Material | undefined>,
) {
  const { area, count, speed, randomness } = toRefs(props)

  const positions = shallowRef<Float32Array>(new Float32Array())
  let velocityArray: Float32Array = new Float32Array()
  let positionsMoved = () => {}

  const setPosition = () => {
    positions.value = new Float32Array(count.value * 3)
    for (let i = 0; i < count.value; i++) {
      const i3 = i * 3
      positions.value[i3] = (Math.random() - 0.5) * area.value[0]
      positions.value[i3 + 1] = (Math.random() - 0.5) * area.value[1]
      positions.value[i3 + 2] = (Math.random() - 0.5) * area.value[2]
    }
  }
  const setSpeed = () => {
    velocityArray = new Float32Array(count.value * 2)
    for (let i = 0; i < count.value * 2; i += 2) {
      velocityArray[i] = ((Math.random() - 0.5) / 5) * speed.value * randomness.value
      velocityArray[i + 1] = (Math.random() / 5) * speed.value
    }
  }
  setSpeed()
  setPosition()

  watch(count, () => {
    setPosition()
    setSpeed()
  })

  watch(area, (newVal, oldVal) => {
    if (!oldVal || newVal[0] !== oldVal[0] || newVal[1] !== oldVal[1] || newVal[2] !== oldVal[2]) {
      setPosition()
    }
  }, { deep: true })

  watch([randomness, speed], () => {
    setSpeed()
  })

  const alphaMap = useTextureProp(() => props.alphaMap)
  const map = useTextureProp(() => props.map)

  const materialProps = computed(() => ({
    size: props.size,
    color: props.color,
    alphaMap: alphaMap.value,
    map: map.value,
    opacity: props.opacity,
    alphaTest: props.alphaTest,
    depthWrite: props.depthWrite,
    transparent: props.transparent,
    sizeAttenuation: props.sizeAttenuation,
  }))
  useMaterialNeedsUpdate(material, materialProps)

  useLoop().onBeforeRender(() => {
    const positionArray = positions.value
    for (let i = 0; i < count.value; i++) {
      const velocityX = velocityArray[i * 2]
      const velocityY = velocityArray[i * 2 + 1]

      positionArray[i * 3] += velocityX
      positionArray[i * 3 + 1] -= velocityY

      if (positionArray[i * 3] <= -area.value[0] / 2 || positionArray[i * 3] >= area.value[0] / 2) { positionArray[i * 3] = positionArray[i * 3] * -1 }
      if (positionArray[i * 3 + 1] <= -area.value[1] / 2 || positionArray[i * 3 + 1] >= area.value[1] / 2) { positionArray[i * 3 + 1] = positionArray[i * 3 + 1] * -1 }
    }
    positionsMoved()
  })

  return {
    positions,
    materialProps,
    onPositionsMoved: (callback: () => void) => { positionsMoved = callback },
  }
}
