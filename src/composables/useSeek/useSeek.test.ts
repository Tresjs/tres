import { Object3D } from 'three'
import { withSetup } from '../../utils/test-utils'
import { useSeek } from '.'

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
  it('should find a child by a property', () => {
    const { seekByName } = composable
    const parent = new Object3D()
    const child = new Object3D()
    child.name = 'testChild'
    parent.add(child)

    const result = seekByName(parent, 'testChild')
    expect(result).toBe(child)
  })
})
