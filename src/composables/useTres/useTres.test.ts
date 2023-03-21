import { useTres } from '.'

describe('useTres', () => {
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
