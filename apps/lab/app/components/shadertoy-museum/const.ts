import type { Mesh, Light, Vector2, Vector3, PerspectiveCamera } from 'three'

export interface ShaderToyTarget {
  name: string
  shader: string
  title: string
  author: string
  description: string
  href: string
  lights: Light[]
  cameras: PerspectiveCamera[]
  target: Mesh
  floor: Mesh
  lightFn: (light: Light, uv: Vector2, iTime: number) => void
  dimensions: Vector3
}

export interface ShaderToyMuseumState {
  title: string
  author: string
  description: string
  i: number
  shaderToyTargets: ShaderToyTarget[]
  next: () => void
}