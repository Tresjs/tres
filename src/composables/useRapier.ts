import type { World } from '@dimforge/rapier3d-compat'
import type Rapier from '@dimforge/rapier3d-compat'
import { inject, provide } from 'vue'

const GRAVITY = { x: 0, y: -9.81, z: 0 }
export interface RapierContext {
  /**
   * The Rapier physics world
   */
  world: World
  setWorld: (world: World) => void
  /**
   * Direct access to the Rapier instance
   */
  rapier: typeof Rapier
  /**
   * Step the physics world one step
   *
   * @param deltaTime The delta time to step the world with
   *
   * @example
   * ```
   * step(1/60)
   * ```
   */
  step: (deltaTime: number) => void
  /**
   * If the physics simulation is paused
   */
  isPaused: boolean
  /**
   * Is debug mode enabled
   */
  isDebug: boolean
}

export async function useRapierContextProvider() {
  const toProvide = {
    world: null as World | null,
    setWorld: (world: World) => {
      toProvide.world = world
    },
    rapier: null as typeof Rapier | null,
    step: (deltaTime: number) => {
      if (toProvide.world) {
        toProvide.world.step(deltaTime)
      }
    },
    isPaused: false,
    isDebug: false,
  }

  provide('useRapier', toProvide)
  
  toProvide.rapier = await import('@dimforge/rapier3d-compat')
  await toProvide.rapier.init()

  /* 
   Initialize the world with gravity and timestep.
  */
  toProvide.world = new toProvide.rapier.World(GRAVITY)

  return toProvide
}

export function useRapierContext(): RapierContext {
  const context = inject<Partial<RapierContext>>('useRapier')

  if (!context) {
    throw new Error('useRapierContext must be used together with useRapierContextProvider')
  }

  return context as RapierContext
}

export const useRapier = useRapierContext