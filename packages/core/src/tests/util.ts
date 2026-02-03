import { vi } from 'vitest'

/**
 * Mocks WebGLRenderer to avoid WebGL context issues in JSDOM
 * Must be called before importing modules that use three
 */
export const mockWebGLRenderer = async () => {
  vi.doMock('three', async (importOriginal) => {
    const actual = await importOriginal<typeof import('three')>()
    return {
      ...actual,
      WebGLRenderer: class MockWebGLRenderer {
        domElement = document.createElement('canvas')
        shadowMap = { enabled: false, type: actual.PCFShadowMap }
        toneMapping = actual.ACESFilmicToneMapping
        toneMappingExposure = 1
        outputColorSpace = actual.SRGBColorSpace
        info = { render: { calls: 0, triangles: 0 }, memory: { geometries: 0, textures: 0 }, autoReset: true, reset: vi.fn() }
        capabilities = { isWebGL2: true, maxTextures: 16, maxCubemapSize: 16384, maxTextureSize: 16384 }
        debug = { checkShaderErrors: true }
        xr = { enabled: false }

        setSize = vi.fn()
        setPixelRatio = vi.fn()
        setClearColor = vi.fn()
        setClearAlpha = vi.fn()
        render = vi.fn()
        dispose = vi.fn()
        clear = vi.fn()
        clearColor = vi.fn()
        clearDepth = vi.fn()
        clearStencil = vi.fn()
        getContext = vi.fn(() => ({}))
        getPixelRatio = vi.fn(() => 1)
        getSize = vi.fn(() => ({ width: 800, height: 600 }))
        setViewport = vi.fn()
        setScissor = vi.fn()
        setScissorTest = vi.fn()
        getRenderTarget = vi.fn(() => null)
        setRenderTarget = vi.fn()
        readRenderTargetPixels = vi.fn()
        setAnimationLoop = vi.fn()
        getDrawingBufferSize = vi.fn(() => new actual.Vector2(800, 600))
        getState = vi.fn(() => ({ colorBuffer: {}, stencilBuffer: {}, depthBuffer: {} }))
      },
    }
  })
}

/**
 * Mocks pointer events to avoid DOM event issues
 * Must be called before importing modules that use @pmndrs/pointer-events
 */
export const mockPointerEvents = async () => {
  const THREE = await import('three')
  vi.doMock('@pmndrs/pointer-events', () => ({
    forwardHtmlEvents: vi.fn(() => ({
      update: vi.fn(),
      destroy: vi.fn(),
    })),
    getVoidObject: vi.fn(() => new THREE.Object3D()),
  }))
}

/**
 * Mocks window dimensions for JSDOM
 */
export const mockWindowDimensions = async () => {
  Object.defineProperty(window, 'innerWidth', { value: 800, writable: true })
  Object.defineProperty(window, 'innerHeight', { value: 600, writable: true })
}

export const setupMocks = async () => {
  await mockWebGLRenderer()
  await mockPointerEvents()
  await mockWindowDimensions()
}
