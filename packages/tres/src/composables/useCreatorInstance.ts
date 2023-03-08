import { normalizeColor, normalizeVectorFlexibleParam } from '/@/utils/normalize'
import { Color, Scene, Vector3, Object3D } from 'three'
import { Component, defineComponent, getCurrentInstance, inject, ShallowRef } from 'vue'

export function useInstanceCreator() {
  function processProps(props, instance) {
    Object.keys(props).forEach(key => {
      if (props[key] !== undefined && key !== 'parentInstance' && key !== 'args') {
        if (instance[key] instanceof Color) {
          instance[key] = normalizeColor(props[key])
        } else if (instance[key] instanceof Vector3) {
          instance[key].set(normalizeVectorFlexibleParam(props[key]))
        } else {
          instance[key] = props[key]
        }
      }
    })
  }
  function append(parent, child) {
    const regex = /[A-Z][a-z]+/g
    const propName = child.type.match(regex).pop().toLowerCase()
    if (parent[propName]) {
      parent[propName] = child
    }
  }

  function createComponentFromInstance(threeObj: any) {
    let instanceProps: string[] = []
    try {
      // @ts-ignore

      instanceProps = [...Object.keys(threeObj)]
    } catch (e) {}
    const cmp = defineComponent({
      name: 'Tres' + threeObj.constructor.name,
      props: ['parentInstance', 'args', ...instanceProps] as unknown as undefined,
      setup(props, { slots, expose }) {
        let instance
        if (props.args) {
          // @ts-ignore
          instance = new threeObj(...props.args)
        } else {
          // @ts-ignore
          instance = new threeObj()
        }

        const scene = inject<ShallowRef<Scene>>('scene')

        expose({ instance })

        if (props.parentInstance) {
          append(props.parentInstance, instance)
        }

        if (scene && !props.parentInstance && instance instanceof Object3D) {
          scene.value.add(instance)
        }

        processProps(props, instance)

        const preparedSlots = slots.default
          ? // eslint-disable-next-line max-len
            slots.default().map(slot => {
              slot.props = {
                ...slot.props,
                parentInstance: instance,
              }
              return slot
            })
          : null

        return () => {
          return preparedSlots
        }
      },
    })
    return cmp
  }
  const extend = (object: any) => {
    if (!object) {
      /*  logError('No objects provided to extend catalogue') */
      return
    }

    const localApp = getCurrentInstance().appContext.app

    const component = createComponentFromInstance(object)

    console.log('component', object)

    if (localApp) {
      if (!localApp._context.components[object.name as string]) {
        localApp.component(`Tres${object.name}` as string, component as Component)
      }
    }
  }
  return { createComponentFromInstance, extend }
}
