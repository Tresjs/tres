import { useTresProvider } from '/@/composables'
import { useTres } from '.'
import { withSetup } from '/@/utils/test-utils'

describe.skip('useTres', () => {
  it('should set the state', () => {
    const { state, setState } = useTres()
    setState('foo', 'bar')
    expect(state.foo).toBe('bar')
  })
  it('should get the state', () => {
    const { setState, getState } = useTres()
    setState('foo', 'bar')
    expect(getState('foo')).toBe('bar')
  })
})
