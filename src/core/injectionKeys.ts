import type { InjectionKey, ShallowRef } from 'vue'

export interface RapierContext {

}

export const rapierInjectionKey: InjectionKey<ShallowRef<RapierContext | null>> = Symbol()
