import { InstancedBufferAttribute } from 'three/webgpu'
import { instancedBufferAttribute } from 'three/tsl'

export const instanced = (array: Float32Array, itemSize: number) => instancedBufferAttribute(new InstancedBufferAttribute(array, itemSize))
