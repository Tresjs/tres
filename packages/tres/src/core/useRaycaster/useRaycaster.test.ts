import { Raycaster, Vector2 } from 'three'
import { useRaycaster } from '.'
import { withSetup } from '/@/utils/test-utils'
import { Window } from 'happy-dom'

const [composable, app] = withSetup(() => useRaycaster())

describe('useRaycaster', () => {
  afterEach(() => {
    app.unmount()
  })
  test('provides raycaster', () => {
    const { raycaster } = composable
    expect(raycaster).toBeDefined()
    expect(raycaster.value).toBeInstanceOf(Raycaster)
  })
  test('provides pointer', () => {
    const { pointer } = composable
    expect(pointer).toBeDefined()
    expect(pointer.value).toBeInstanceOf(Vector2)
  })
})
