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
import TorusKnot from './core/TorusKnot.vue'
import Circle from './core/Circle.vue'
import Cone from './core/Cone.vue'
import Tube from './core/Tube.vue'
import Ring from './core/Ring.vue'
import Tetrahedron from './core/Tetrahedron.vue'
import Icosahedron from './core/Icosahedron.vue'
import Octahedron from './core/Octahedron.vue'
import Dodecahedron from './core/Dodecahedron.vue'
import { Environment } from './core/useEnvironment/component'

export * from './core/useGLTF'
export * from './core/useFBX'
export * from './core/useEnvironment'
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
  TorusKnot,
  Circle,
  Cone,
  Tube,
  Ring,
  Tetrahedron,
  Icosahedron,
  Octahedron,
  Dodecahedron,
  useAnimations,
  Environment,
}
