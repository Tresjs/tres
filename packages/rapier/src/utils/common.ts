import type { QuaternionLike, Vector3Like } from 'three'

export const isVector3Like = (value: any): value is Vector3Like => {
  return (
    value !== null
    && typeof value === 'object'
    && typeof value.x === 'number'
    && typeof value.y === 'number'
    && typeof value.z === 'number'
  )
}

export const isVector4Like = (value: any): value is QuaternionLike => {
  return (
    value !== null
    && typeof value === 'object'
    && typeof value.x === 'number'
    && typeof value.y === 'number'
    && typeof value.z === 'number'
    && typeof value.w === 'number'
  )
}

export const parsePosition = (position: any): Vector3Like => {
  let x = 0
  let y = 0
  let z = 0

  if (typeof position === 'number') {
    x = position
    y = position
    z = position
  }

  if (Array.isArray(position)) {
    x = Number(position[0])
    y = Number(position[1])
    z = Number(position[2])
  }

  if (isVector3Like(position)) {
    x = Number(position.x)
    y = Number(position.y)
    z = Number(position.z)
  }

  return {
    x: Number.isNaN(x) ? 0 : x,
    y: Number.isNaN(y) ? 0 : y,
    z: Number.isNaN(z) ? 0 : z,
  }
}

export const parseRotation = (rotation: any): QuaternionLike => {
  const vector3 = parsePosition(rotation)

  let w = 1

  if (Array.isArray(rotation) && rotation.length === 4) {
    w = Number(rotation[3])
  }

  if (isVector4Like(rotation)) {
    w = Number(rotation.w)
  }

  return {
    ...vector3,
    w: Number.isNaN(w) ? 1 : w,
  }
}
