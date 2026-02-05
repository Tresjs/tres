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
  const colliderNode = source.object?.__vnode?.children?.[1]?.children?.find(child => child?.component?.exposed?.instance?.value === source.context.collider)

  if (
    (source.object?.__vnode?.ctx as unknown as ComponentInternalInstance)?.props?.sensor
    && colliderNode?.component === undefined
  ) {
    source.object?.__vnode?.ctx?.emit?.(
      `intersection-${CollisionType}`,
      { source, target },
    )
  }
  colliderNode?.component?.emit?.(`intersection-${CollisionType}`, { source, target })
}
