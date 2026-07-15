import type { InjectionKey, ShallowRef } from 'vue'

import type { InjectableRapierContext } from '../types/rapier'

export const rapierInjectionKey: InjectionKey<
  ShallowRef<InjectableRapierContext | null>
> = Symbol('tresrapier')
