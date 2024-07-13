import type { EffectComposer } from 'postprocessing'
import type { InjectionKey, ShallowRef } from 'vue'

export const effectComposerInjectionKey: InjectionKey<ShallowRef<EffectComposer | null>> = Symbol('effectComposer')
