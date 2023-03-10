import { describe } from 'vitest'
import { shallowRef } from 'vue'
import { useInstanceCreator } from '.'
import { useTres } from '../useTres'
import { withSetup } from '/@/utils/test-utils'

const [composable, app] = withSetup(() => useInstanceCreator('Tres'))

describe('useInstanceCreator', () => {
  // TODO: understand why this is not working
  it.todo('should create component instances', () => {
    const { createComponentInstances } = composable
    const catalogue = shallowRef({
      TresBox: { name: 'TresBox' },
      TresSphere: { name: 'TresSphere' },
      TresPlane: { name: 'TresPlane' },
    })
    app.provide('catalogue', catalogue)

    app.provide('useTres', useTres())
    const components = createComponentInstances(catalogue)
    expect(components).toHaveLength(3)
    expect(components[0][0]).toBe('TresBox')
    expect(components[1][0]).toBe('TresSphere')
    expect(components[2][0]).toBe('TresPlane')
  })
})
