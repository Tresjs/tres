import { EffectComposer } from 'postprocessing'
import { InjectionKey, ShallowRef } from 'vue'

export const effectComposerInjectionKey: InjectionKey<ShallowRef<EffectComposer | null>> = Symbol()
