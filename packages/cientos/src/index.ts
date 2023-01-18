import OrbitControls from './core/OrbitControls.vue'
import TransformControls from './core/TransformControls.vue'
import { useTweakPane } from './core/useTweakPane'
import { useAnimations } from './core/useAnimations'
import { GLTFModel } from './core/useGLTF/component'
import { FBXModel } from './core/useFBX/component'
import Text3D from './core/Text3D.vue'
import Plane from './core/Plane.vue'
import Box from './core/Box.vue'
import Sphere from './core/Sphere.vue'
import Torus from './core/Torus.vue'

export * from './core/useGLTF'
export * from './core/useFBX'
export * from './types'
export {
  OrbitControls,
  TransformControls,
  useTweakPane,
  GLTFModel,
  FBXModel,
  Text3D,
  Plane,
  Box,
  Sphere,
  Torus,
  useAnimations,
}
