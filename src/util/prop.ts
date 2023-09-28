import type { Ref, WatchOptions } from 'vue'
import { watch } from 'vue'
import { set, get } from './object'

/**
 * Creates a prop watcher function that monitors changes to a property and updates a target object.
 * 
 * @template T - The type of the property being watched.
 * @template E - The type of the target object.
 * @param {() => T} propGetter - A function that retrieves the prop value to be watched.
 * @param {Ref<E>} target - A Ref representing the target object to be updated.
 * @param {string} propertyPath - The dot-separated path to the property within the target object.
 * @param {() => E & { dispose?(): void }} newPlainObjectFunction - A function that creates a new plain object to retrieve the defaults from with an optional "dispose" method for cleanup.
 * @param {WatchOptions} watchOptions - The options for watch.
 */
export const makePropWatcher = <T, E>(
  propGetter: () => T,
  target: Ref<E>,
  propertyPath: string,
  newPlainObjectFunction: () => E & { dispose?(): void },
  watchOptions: WatchOptions = {},
) =>
    watch(propGetter, (newValue) => {
      if (!target.value) return

      if (newValue === undefined) {
        const plainObject = newPlainObjectFunction()

        set(target.value, propertyPath, get(plainObject, propertyPath))

        plainObject.dispose?.()
      }
      else 
        set(target.value, propertyPath, propGetter())
    },
    watchOptions)

/**
 * Creates multiple prop watchers for monitoring changes to multiple properties and updating a target object.
 *
 * @template T - The type of the property being watched.
 * @template E - The type of the target object.
 * @param {(string | (() => T))[][]} propGettersAndPropertyPaths - An array of arrays containing pairs of prop getters and their corresponding property paths within the target object.
 * @param {Ref<E>} target - A Ref representing the target object to be updated.
 * @param {() => E & { dispose?(): void }} newPlainObjectFunction - A function that creates a new plain object to retrieve the defaults from with an optional "dispose" method for cleanup.
 */
export const makePropWatchers = <T, E>(
  propGettersAndPropertyPaths: (string | (() => T))[][],
  target: Ref<E>,
  newPlainObjectFunction: () => E & { dispose?(): void },
) => 
    propGettersAndPropertyPaths.map(([propGetterFn, path]) => makePropWatcher(
      propGetterFn as () => T, target, path as string, newPlainObjectFunction,
    ))
