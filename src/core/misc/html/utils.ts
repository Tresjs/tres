import { OrthographicCamera, PerspectiveCamera, Vector2, Vector3 } from 'three'
import type { TresCamera, TresObject3D } from '@tresjs/core'
import type { Matrix4, Raycaster } from 'three'

export const v1 = new Vector3(0, 0, 0)
export const v2 = new Vector3(0, 0, 0)
export const v3 = new Vector3(0, 0, 0)

export function calculatePosition(instance: TresObject3D, camera: TresCamera, size: { width: number, height: number }) {
  const objectPos = v1.setFromMatrixPosition(instance.matrixWorld)
  objectPos.project(camera)
  const widthHalf = size.width / 2
  const heightHalf = size.height / 2
  return [
    (Number.isNaN(objectPos.x) ? 0 : objectPos.x) * widthHalf + widthHalf,
    -(objectPos.y * heightHalf) + heightHalf,
  ]
}

export function isObjectBehindCamera(el: TresObject3D, camera: TresCamera) {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld)
  const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld)
  const deltaCamObj = objectPos.sub(cameraPos)
  const camDir = camera.getWorldDirection(v3)
  return deltaCamObj.angleTo(camDir) > Math.PI / 2
}

export function isObjectVisible(el: TresObject3D, camera: TresCamera, raycaster: Raycaster, occlude: any) {
  const elPos = v1.setFromMatrixPosition(el.matrixWorld)
  const screenPos = elPos.clone()
  screenPos.project(camera)
  raycaster.setFromCamera(new Vector2(screenPos.x, screenPos.y), camera)
  const intersects = raycaster.intersectObjects(occlude, true)

  if (intersects.length > 0) {
    const intersectionDistance = intersects[0].distance
    const pointDistance = elPos.distanceTo(raycaster.ray.origin)

    return pointDistance < intersectionDistance
  }
  return true
}

export function objectScale(el: TresObject3D, camera: TresCamera) {
  if (camera instanceof OrthographicCamera) {
    return camera.zoom
  }
  else if (camera instanceof PerspectiveCamera) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld)
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld)
    const vFOV = (camera.fov * Math.PI) / 180
    const dist = objectPos.distanceTo(cameraPos)
    const scaleFOV = 2 * Math.tan(vFOV / 2) * dist
    return 1 / scaleFOV
  }
  else {
    return 1
  }
}

export function objectZIndex(el: TresObject3D, camera: TresCamera, zIndexRange: Array<number>) {
  if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld)
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld)
    const dist = objectPos.distanceTo(cameraPos)
    const A = (zIndexRange[1] - zIndexRange[0]) / (camera.far - camera.near)
    const B = zIndexRange[1] - A * camera.far
    return Math.round(A * dist + B)
  }
  return undefined
}

export const epsilon = (value: number) => (Math.abs(value) < 1e-10 ? 0 : value)

export function getCSSMatrix(matrix: Matrix4, multipliers: number[], prepend = '') {
  let matrix3d = 'matrix3d('
  for (let i = 0; i !== 16; i++) {
    matrix3d += epsilon(multipliers[i] * matrix.elements[i]) + (i !== 15 ? ',' : ')')
  }
  return prepend + matrix3d
}

export const getCameraCSSMatrix
  = ((multipliers: number[]) =>
    (matrix: Matrix4) => getCSSMatrix(matrix, multipliers))([1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1])

export const getObjectCSSMatrix
  = ((scaleMultipliers: (n: number) => number[]) =>
    (matrix: Matrix4, factor: number) =>
      getCSSMatrix(matrix, scaleMultipliers(factor), 'translate(-50%,-50%)'))((f: number) =>
    [1 / f, 1 / f, 1 / f, 1, -1 / f, -1 / f, -1 / f, -1, 1 / f, 1 / f, 1 / f, 1, 1, 1, 1, 1])
