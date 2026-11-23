import type { Camera } from 'three'
import type { Node, WebGPURenderer } from 'three/webgpu'
import type { RenderPipelinePasses, TslScene } from '@tresjs/core/webgpu'
import type { ComponentInternalInstance, InjectionKey } from 'vue'

export interface EffectCreateState<U> {
  /** One uniform per prop of this effect instance. A prop change writes its `.value`. */
  uniforms: U
  passes: RenderPipelinePasses
  scene: TslScene
  camera: Camera | undefined
  renderer: WebGPURenderer
}

/** `hdr` effects run on linear scene colors, before tone mapping. `ldr` effects run on display colors, after it. */
export type EffectStage = 'hdr' | 'ldr'

export interface ComposedEffect {
  instance: ComponentInternalInstance
  stage: EffectStage
  create: (input: Node, state: EffectCreateState<any>) => Node
  uniforms: Record<string, unknown>
}

export interface ComposerEffects {
  add: (effect: ComposedEffect) => void
  remove: (effect: ComposedEffect) => void
}

export const effectComposerInjectionKey: InjectionKey<ComposerEffects> = Symbol('effectComposerWebGPU')
