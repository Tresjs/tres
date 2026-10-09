import { useTres } from '@tresjs/core'
import type { Material } from 'three'
import { Spherical, Vector3 } from 'three'
import type { ShallowRef } from 'vue'
import { computed, shallowRef, watch, watchEffect } from 'vue'
import { useMaterialNeedsUpdate } from '../../../utils/useMaterialNeedsUpdate'
import type { StarsProps } from './props'

export function useStars(
  props: Required<Pick<StarsProps, 'count' | 'depth' | 'radius'>> & StarsProps,
  material: ShallowRef<Material | undefined>,
) {
  const positions = shallowRef(new Float32Array())
  const scales = shallowRef(new Float32Array())

  const materialProps = computed(() => ({
    size: props.size,
    sizeAttenuation: props.sizeAttenuation,
    transparent: props.transparent,
    alphaTest: props.alphaTest,
    alphaMap: props.alphaMap,
  }))
  useMaterialNeedsUpdate(material, materialProps)

  const { invalidate } = useTres()

  watch(props, () => {
    invalidate()
  })

  const randomPointOnSphere = (radius: number): Array<number> => {
    return new Vector3()
      .setFromSpherical(new Spherical(radius, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI))
      .toArray()
  }

  const setStars = () => {
    let shellRadius = props.radius + props.depth
    const increment = props.depth / props.count

    const positionArray: number[] = []
    const scaleArray: number[] = Array.from(
      { length: props.count },
      () => (0.5 + 0.5 * Math.random()) * 4,
    )

    for (let i = 0; i < props.count; i++) {
      shellRadius -= increment * Math.random()
      positionArray.push(...randomPointOnSphere(shellRadius))
    }
    positions.value = new Float32Array(positionArray)
    scales.value = new Float32Array(scaleArray)
  }

  watchEffect(() => {
    setStars()
  })

  return { positions, scales, materialProps }
}
