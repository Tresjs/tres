export function isVector2(obj: { x: number, y: number }) {
  return obj && typeof obj.x === 'number' && typeof obj.y === 'number'
}

export function isVector3(obj: { x: number, y: number, z: number }) {
  return obj && typeof obj.x === 'number' && typeof obj.y === 'number' && typeof obj.z === 'number'
}

export function isEuler(obj: { x: number, y: number, z: number, isEuler?: boolean }) {
  return obj && obj.isEuler
}
