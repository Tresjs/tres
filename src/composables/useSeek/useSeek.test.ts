import { Object3D } from 'three'
import { useSeek } from '.'
import { withSetup } from '../../utils/test-utils'

const [composable, app] = withSetup(() => useSeek())

describe('useSeek', () => {
  afterEach(() => {
    app.unmount()
  })
  it('should find a child by a property', () => {
    const { seek } = composable
    const parent = new Object3D()
    const child = new Object3D()
    ;(child as any).customProperty = 'customValue'
    parent.add(child)

    const result = seek(parent, 'customProperty', 'customValue')
    expect(result).toBe(child)
  })
  it('should find a child by a name', () => { // Renamed the test case to have a different name
    const { seekByName } = composable
    const parent = new Object3D()
    const child = new Object3D()
    child.name = 'testChild'
    parent.add(child)

    const result = seekByName(parent, 'testChild')
    expect(result).toBe(child)
  })
})
