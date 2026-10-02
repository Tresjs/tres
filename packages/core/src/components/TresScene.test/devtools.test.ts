import { h } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { initializeSceneCreator } from './util'

describe('devtools registration', () => {
  afterEach(() => {
    vi.doUnmock('../../devtools')
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it.each([
    { nodeEnv: 'production', mode: 'production', registrations: 0 },
    { nodeEnv: 'production', mode: 'staging', registrations: 0 },
    { nodeEnv: 'development', mode: 'development', registrations: 1 },
  ])('registers $registrations times with NODE_ENV=$nodeEnv and mode=$mode', async ({ nodeEnv, mode, registrations }) => {
    vi.stubEnv('NODE_ENV', nodeEnv)
    vi.stubEnv('MODE', mode)
    const register = vi.fn()
    vi.doMock('../../devtools', () => ({ registerTresDevtools: register }))
    const { createScene } = await initializeSceneCreator()
    const { context, sceneWrapper } = await createScene(() => [h('TresGroup')])

    try {
      expect(context.scene.value.children).toHaveLength(1)
      expect(register).toHaveBeenCalledTimes(registrations)
    }
    finally {
      sceneWrapper.unmount()
    }
  })
})
