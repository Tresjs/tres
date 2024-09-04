import { inject, provide } from 'vue'

import { GRAVITY } from '../constants/physics'
import type { RapierContext } from '../types/rapier'

/**
 * @description Provides the `RapierContext` provider.
 */
export async function useRapierContextProvider() {
  const toProvide: Partial<RapierContext> = {
    rapier: undefined,
    world: undefined,
    isPaused: false,
    isDebug: false,
    setWorld: (world) => {
      toProvide.world = world
    },
    step: (timestep) => {
      if (!toProvide.world) { return }
      if (typeof timestep === 'number') { toProvide.world.timestep = timestep }

      toProvide.world.step()
    },
  }

  provide('useRapier', toProvide)

  toProvide.rapier = await import('@dimforge/rapier3d-compat')
  await toProvide.rapier.init()

  /* Initialize the world with gravity and timestep. */
  toProvide.world = new toProvide.rapier.World(GRAVITY)

  return toProvide as RapierContext
}

/**
 * @description Provides the `RapierContext`
 *
 * @internal
 */
export function useRapierContext(): RapierContext {
  const context = inject<Partial<RapierContext>>('useRapier')

  if (!context?.world) {
    throw new Error(
      'useRapierContext must be used together with useRapierContextProvider',
    )
  }

  return context as RapierContext
}

/**
 * @description Provides the `RapierContext`
 */
export const useRapier = useRapierContext
