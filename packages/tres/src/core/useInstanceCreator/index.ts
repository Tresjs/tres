/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-empty-function */
import { PerspectiveCamera } from 'three'
import { defineComponent } from 'vue'
import { isArray, isDefined } from '@alvarosabu/utils'
import { normalizeVectorFlexibleParam } from '/@/utils/normalize'
import { useCamera, useScene } from '/@/core/'
import { useLogger } from '/@/composables'
import { TresInstance, TresVNodeType } from '../../types'

const VECTOR3_PROPS = ['rotation', 'scale', 'position']

export function useInstanceCreator(prefix: string) {
  const { logMessage, logError } = useLogger()

  function createComponentInstances(newObjects: Record<string, any>) {
    return Object.entries(newObjects)
      .filter(([_key, value]) => (value as { prototype: any })?.prototype?.constructor?.toString().includes('class'))
      .map(([key, value]) => {
        const name = `${prefix}${key}`
        const cmp = defineComponent({
          name,
          setup(props, { slots, attrs, ...ctx }) {
            logMessage(name, {
              props,
              slots,
              attrs,
              ctx,
            })
            let instance: TresInstance
            const { scene } = useScene()
            const { pushCamera } = useCamera()

            function createInstance() {
              if (slots?.default && slots?.default()) {
                const internal = slots.default().map(vnode => {
                  let internalInstance
                  const vNodeType = ((vnode.type as TresVNodeType).name as string).replace(prefix, '')
                  if (vnode?.props?.args) {
                    internalInstance = new newObjects[vNodeType](...vnode.props.args)
                  } else {
                    internalInstance = new newObjects[vNodeType]()
                  }
                  if (vnode?.props) {
                    processProps(vnode.props, internalInstance)
                  }

                  return internalInstance
                })

                instance = new value(...internal)
              } else if ((attrs as { args: [] }).args) {
                instance = new value(...(attrs as { args: [] }).args)
              } else {
                instance = new value()
              }

              processProps(attrs, instance)
              if (name.includes('Camera')) {
                pushCamera(instance as unknown as PerspectiveCamera)
              } else {
                scene?.value.add(instance)
              }
              logMessage('Instance added', scene)

              ctx.expose(instance)
            }

            function processProps(attrs: any, instance: TresInstance) {
              Object.entries(attrs).forEach(([key, value]) => {
                const camel = key.replace(/(-\w)/g, m => m[1].toUpperCase())
                if (camel === 'args' || value === undefined) {
                  return
                }
                // Check if property is a Vector3
                if (VECTOR3_PROPS.includes(key) && value) {
                  value = normalizeVectorFlexibleParam(value)
                }
                try {
                  if (instance[camel] && isDefined(instance[camel].set)) {
                    if (isArray(value)) {
                      instance[camel].set(...(value as Array<number>))
                    } else {
                      instance[camel].set(value)
                    }
                  } else {
                    if (value === '') {
                      value = true
                    }
                    instance[camel] = value
                  }
                } catch (error: unknown) {
                  logError(`There was an error setting ${camel} property`, error as Error)
                }
              })

              if (attrs.ref) {
                attrs.ref = instance
              }
            }

            createInstance()

            return () => {}
          },
        })

        return [name, cmp]
      })
  }

  return {
    createComponentInstances,
  }
}
