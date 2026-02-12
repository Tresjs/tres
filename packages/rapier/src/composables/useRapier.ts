import { createInjectionState } from '@vueuse/core'
import { shallowRef, ref } from 'vue'
import type { RapierContext } from '../types/rapier'
import type { World } from '@dimforge/rapier3d-compat'
import { GRAVITY } from '../constants/physics'

const [
  useRapierContextProvider,
  _useRapierContext
] = createInjectionState((): RapierContext => {
  const rapier = shallowRef()
  const world = shallowRef()
  const isPaused = ref(false)
  const isDebug = ref(false)

  const init = async () => {
    const RAPIER = await import('@dimforge/rapier3d-compat')
    await RAPIER.init()
    rapier.value = RAPIER
    world.value = new RAPIER.World(GRAVITY)
  }

  const setWorld = (w: World) => {
    world.value = w
  }

  const step = (timestep?: number) => {
    if (!world.value) return
    if (typeof timestep === 'number') world.value.timestep = timestep
    world.value.step()
  }

  return {
    rapier,
    world,
    isPaused,
    isDebug,
    init,
    setWorld,
    step,
  }
}, { injectionKey: 'useRapier' })

const useRapierContext = () => {
  const ctx = _useRapierContext()
  if (!ctx?.world.value) {
    throw new Error('useRapierContext must be used together with useRapierContextProvider')
  }
  return ctx
}

export const useRapier = useRapierContext
export { useRapierContext, useRapierContextProvider }