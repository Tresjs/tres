import type { InjectionKey, ShallowRef } from 'vue'

import type { InjectableRapierContext } from '../types/rapier'
import type { RigidBodyContext } from '../types/rigid-body'

export const rapierInjectionKey: InjectionKey<
  ShallowRef<InjectableRapierContext | null>
> = Symbol('tresrapier')

export const bodyContextInjectionKey: InjectionKey<
  ShallowRef<RigidBodyContext | undefined>
> = Symbol('tresrapier-body-context')
