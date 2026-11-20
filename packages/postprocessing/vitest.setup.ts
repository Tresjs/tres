import { vi } from 'vitest'

// A setup file, so every test that mounts a Tres context gets the stub before core is imported.
vi.mock('@pmndrs/pointer-events', async () => {
  const { Object3D } = await import('three')
  return { forwardHtmlEvents: () => ({ update: () => {}, destroy: () => {} }), getVoidObject: () => new Object3D() }
})
