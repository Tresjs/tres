import type { Camera, OrthographicCamera, PerspectiveCamera } from 'three'

export const isPerspectiveCamera = (camera?: Camera): camera is PerspectiveCamera =>
  Boolean(camera && (camera as PerspectiveCamera).isPerspectiveCamera)

export const isOrthographicCamera = (camera?: Camera): camera is OrthographicCamera =>
  Boolean(camera && (camera as OrthographicCamera).isOrthographicCamera)
