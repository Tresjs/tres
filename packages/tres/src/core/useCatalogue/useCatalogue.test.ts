import { createApp } from 'vue'
import { withSetup } from '/@/utils/test-utils'
import { useCatalogue } from './'
const [composable, app] = withSetup(() => useCatalogue())

describe('useCatalogue', () => {
  it('should fill the catalogue with THREE objects', () => {
    const { catalogue } = composable

    expect(catalogue.value).toHaveProperty('Mesh')
    expect(catalogue.value).toHaveProperty('MeshBasicMaterial')
  })
  it('should skip Scene object', () => {
    const { catalogue } = composable

    expect(catalogue.value).not.toHaveProperty('Scene')
  })
  it('should extend the catalogue with objects', () => {
    const app = createApp({})
    const { extend, catalogue } = useCatalogue(app)

    extend({ MyObject: { foo: 'bar' } })

    expect(catalogue.value.MyObject.foo).toEqual('bar')
  })

  it('should register components for new objects', () => {
    const { extend } = composable

    extend({ MyObject: { foo: 'bar' } })

    expect(app._context.components.MyObject).toBeDefined()
  })
  // TODO: find a way to mock createComponentInstances to test the component registration
})
