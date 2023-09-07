import GLTFModel from './useGLTF/component.vue'
import FBXModel from './useFBX/component.vue'
import SVG from './SVG/component.vue'
import { useProgress } from './useProgress'
import { useVideoTexture } from './useVideoTexture'

export * from './useGLTF'
export * from './useFBX'

export { FBXModel, GLTFModel, SVG, useProgress, useVideoTexture }
