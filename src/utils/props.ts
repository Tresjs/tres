import { watch } from 'vue'
import type { RigidBody } from '@dimforge/rapier3d-compat'
import type { ShallowRef } from 'vue'
import type {
  CallableProps,
  ColliderProps,
  CreateColliderReturnType,
  Methods,
  RigidBodyContext,
  RigidBodyProps,
} from '../types'

export const makePropWatcherRB = <
  K extends keyof RigidBodyProps,
>(
  props: RigidBodyProps,
  toWatch: K,
  instance: ShallowRef<RigidBodyContext['rigidBody'] | undefined>,
  onSet: `set${Capitalize<keyof RigidBodyProps>}`,
) => watch([() => props[toWatch], instance], ([newValue, _]) => {
  if (!instance.value) { return }
  // TODO: we should give users the possibility to set the wakeUp parameter.
  ((instance.value[onSet as keyof Methods<RigidBody>]) as CallableProps<RigidBody>[keyof CallableProps<RigidBody>])?.(...(Array.isArray(newValue) ? (newValue as boolean[]) : [newValue]), true)
})

export const makePropsWatcherRB = <
  K extends keyof RigidBodyProps,
>(
  props: RigidBodyProps,
  watchers: K[],
  instance: ShallowRef<RigidBodyContext['rigidBody'] | undefined>,
) => watchers.forEach((_) => {
  const watcher = _ as string
  // Uppercase only for the first letter in the watcher
  const watcherName = watcher.charAt(0).toUpperCase()
    + watcher.slice(1) as Capitalize<keyof RigidBodyProps>
  makePropWatcherRB(props, watcher as keyof RigidBodyProps, instance, `set${watcherName}`)
})

export const makePropWatcherCL = <
  K extends keyof ColliderProps,
>(
  props: ColliderProps,
  toWatch: K,
  instance: ShallowRef<CreateColliderReturnType | undefined>,
  onSet: `set${Capitalize<keyof ColliderProps>}`,
) => watch([() => props[toWatch], instance], ([newValue, _]) => {
  if (!instance.value) { return }
  (instance.value.collider[onSet as keyof typeof instance.value.collider] as CallableProps<ColliderProps>[keyof CallableProps<ColliderProps>])?.(newValue, true)
})

export const makePropsWatcherCL = <
  K extends keyof ColliderProps,
>(
  props: ColliderProps,
  watchers: K[],
  instance: ShallowRef<CreateColliderReturnType | undefined>,
) => watchers.forEach((_) => {
  const watcher = _ as string
  // Uppercase only for the first letter in the watcher
  const watcherName = watcher.charAt(0).toUpperCase()
    + watcher.slice(1) as Capitalize<keyof ColliderProps>
  makePropWatcherCL(props, watcher as keyof ColliderProps, instance, `set${watcherName}`)
})
