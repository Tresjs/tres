import * as THREE from 'three'

// NOTE: Source
// https://github.com/pmndrs/drei/blob/f8e5653f7f60d3782301c13e781c9966370b8fda/src/core/calculateScaleFactor.ts#L24

const tV0 = new THREE.Vector3()
const tV1 = new THREE.Vector3()
const tV2 = new THREE.Vector3()

interface Size {
  width: number
  height: number
}

const getPoint2 = (point3: THREE.Vector3, camera: THREE.Camera, size: Size) => {
  const widthHalf = size.width / 2
  const heightHalf = size.height / 2
  camera.updateMatrixWorld(false)
  const vector = point3.project(camera)
  vector.x = vector.x * widthHalf + widthHalf
  vector.y = -(vector.y * heightHalf) + heightHalf
  return vector
}

const getPoint3 = (point2: THREE.Vector3, camera: THREE.Camera, size: Size, zValue: number = 1) => {
  const vector = tV0.set((point2.x / size.width) * 2 - 1, -(point2.y / size.height) * 2 + 1, zValue)
  vector.unproject(camera)
  return vector
}

export const calculateScaleFactor = (point3: THREE.Vector3, radiusPx: number, camera: THREE.Camera, size: Size) => {
  const point2 = getPoint2(tV2.copy(point3), camera, size)
  let scale = 0
  for (let i = 0; i < 2; ++i) {
    const point2off = tV1.copy(point2).setComponent(i, point2.getComponent(i) + radiusPx)
    const point3off = getPoint3(point2off, camera, size, point2off.z)
    scale = Math.max(scale, point3.distanceTo(point3off))
  }
  return scale
}
