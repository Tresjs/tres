import { watch } from 'vue'
import type { RigidBody } from '@dimforge/rapier3d-compat'
import type { ShallowRef } from 'vue'
import type { CallableProps, Methods, RigidBodyContext, RigidBodyProps } from '../types'

export const makePropWatcherRB = <
  K extends keyof RigidBodyProps,
>(
  props: RigidBodyProps,
  toWatch: K,
  instance: ShallowRef<RigidBodyContext['rigidBody']>,
  onSet: `set${Capitalize<keyof RigidBodyProps>}`,
) => watch([() => props[toWatch], instance], ([newValue, _]) => {
  if (!instance.value) { return }
  ((instance.value[onSet as keyof Methods<RigidBody>]) as CallableProps<RigidBody>[keyof CallableProps<RigidBody>])?.(newValue, true)
})

export const makePropsWatcherRB = <
  K extends keyof RigidBodyProps,
>(
  props: RigidBodyProps,
  watchers: K[],
  instance: ShallowRef<RigidBodyContext['rigidBody']>,
) => watchers.forEach((_) => {
  const watcher = _ as string
  // Uppercase only for the first letter in the watcher
  const watcherName = watcher.charAt(0).toUpperCase()
    + watcher.slice(1) as Capitalize<keyof RigidBodyProps>
  makePropWatcherRB(props, watcher as keyof RigidBodyProps, instance, `set${watcherName}`)
})
