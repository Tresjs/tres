import type { ComponentInternalInstance } from 'vue'
import type { CollisionType, SourceTarget } from '../types'

/**
 * @description Make traversed {@link SourceTarget Source} emit an intersection event.
 *
 * Either `@intersection-start` or `intersection-exist` based on the {@link CollisionType}.
 *
 * @param source - The traversed source.
 * @param target - The traversing target.
 * @param started - Whether the intersection started or ended
 */
export const emitIntersection = (
  source: SourceTarget,
  target: SourceTarget,
  started: boolean,
) => {
  const CollisionType: CollisionType = started ? 'enter' : 'exit'
  const [rigidBodyObject] = source.objects
  const [, colliderObject] = target.objects
  const rigidBodyHasSensor = (rigidBodyObject?.__vnode?.ctx as unknown as ComponentInternalInstance)?.props?.sensor
  const currentHasSensor = (colliderObject?.__vnode?.ctx as unknown as ComponentInternalInstance)?.props?.sensor

  if (rigidBodyHasSensor) {
    rigidBodyObject?.__vnode?.ctx?.emit?.(`intersection-${CollisionType}`, {
      source,
      target,
    })
  }
  if (currentHasSensor) {
    colliderObject?.__vnode?.ctx?.emit?.(`intersection-${CollisionType}`, {
      source,
      target,
    })
  }
}
