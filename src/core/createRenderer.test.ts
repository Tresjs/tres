// @vitest-environment happy-dom

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createRenderer } from './createRenderer'
import type { TresContext } from '../composables'
import { WebGLRenderer } from 'three'
import type { TresRenderer } from '../types'

// Mock both renderers
vi.mock('three', () => ({
  WebGLRenderer: vi.fn(),
}))

vi.mock('three/webgpu', () => ({
  WebGPURenderer: vi.fn().mockImplementation(() => ({
    init: vi.fn().mockResolvedValue(undefined),
  })),
}))

describe('createRenderer', () => {
  const mockContext: TresContext = {
    canvas: {
      value: document.createElement('canvas'),
    },
  } as TresContext

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('options.renderer handling', () => {
    it('should create a WebGLRenderer with default options when no renderer provided', async () => {
      const renderer = await createRenderer(mockContext, {})
      expect(renderer).toBeDefined()
      expect(WebGLRenderer).toHaveBeenCalled()
    })

    it('should create a WebGLRenderer with custom options', async () => {
      await createRenderer(mockContext, {
        antialias: true,
        depth: true,
      })
      expect(WebGLRenderer).toHaveBeenCalledWith({
        antialias: true,
        depth: true,
        canvas: mockContext.canvas.value,
      })
    })

    it('should call and return result if renderer is a function', async () => {
      const mockWebGPURenderer = {
        init: vi.fn().mockResolvedValue(undefined),
      } as unknown as TresRenderer
      const createWebGPURenderer = vi.fn().mockResolvedValue(mockWebGPURenderer)

      const renderer = await createRenderer(mockContext, {
        renderer: createWebGPURenderer,
      })

      expect(createWebGPURenderer).toHaveBeenCalledWith(mockContext)
      expect(renderer).toBe(mockWebGPURenderer)
    })

    it('should return the renderer directly if provided as an instance', async () => {
      const mockRenderer = { isCustomRenderer: true } as unknown as TresRenderer
      const renderer = await createRenderer(mockContext, {
        renderer: mockRenderer,
      })

      expect(WebGLRenderer).not.toHaveBeenCalled()
      expect(renderer).toBe(mockRenderer)
    })
  })
})
