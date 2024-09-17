import type { Component } from 'vue'

import BaseCollider from './BaseCollider.vue'
import type { ColliderProps, ColliderShape } from '../../types'

const shapePrefixes: ColliderShape[] = [
  'ball',
  'cuboid',
  'capsule',
  'cone',
  'cylinder',
  'hull',
  'trimesh',
  'heightfield',
]
const otherColliders = {} as Record<
  Capitalize<`${ColliderShape}Collider`>,
  Component<Omit<ColliderProps, 'shape'>>
>

for (const shape of shapePrefixes) {
  otherColliders[
    `${
      (shape.charAt(0).toUpperCase()
        + shape.slice(1)) as Capitalize<ColliderShape>
    }Collider`
  ] = {
    extends: BaseCollider,
    props: {
      ...BaseCollider.props,
      shape: undefined,
    },
    setup(props, ctx) {
      return {
        ...BaseCollider?.setup?.(
          { ...props, shape } as Parameters<
            Exclude<(typeof BaseCollider)['setup'], undefined>
          >['0'],
          ctx,
        ),
      }
    },
  }
}

/** @description `Collider` with the shape set to `ball` */
export const BallCollider = otherColliders.BallCollider

/** @description `Collider` with the shape set to `capsule` */
export const CapsuleCollider = otherColliders.CapsuleCollider

/** @description `Collider` with the shape set to `cone` */
export const ConeCollider = otherColliders.ConeCollider

/** @description `Collider` with the shape set to `cuboid` */
export const CuboidCollider = otherColliders.CuboidCollider

/** @description `Collider` with the shape set to `cylinder` */
export const CylinderCollider = otherColliders.CylinderCollider

/** @description `Collider` with the shape set to `heightfield` */
export const HeightfieldCollider = otherColliders.HeightfieldCollider

/** @description `Collider` with the shape set to `hull` */
export const HullCollider = otherColliders.HullCollider

/** @description `Collider` with the shape set to `trimesh` */
export const TrimeshCollider = otherColliders.TrimeshCollider

export { default as BaseCollider } from './BaseCollider.vue'
