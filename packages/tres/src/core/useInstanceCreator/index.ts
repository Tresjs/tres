/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-empty-function */
import { BufferAttribute, FogBase, OrthographicCamera, PerspectiveCamera, Scene } from 'three'
import { defineComponent, inject, Ref } from 'vue'
import { isArray, isDefined, isFunction } from '@alvarosabu/utils'
import { normalizeVectorFlexibleParam } from '/@/utils/normalize'
import { useCamera, useCatalogue, useScene } from '/@/core/'
import { useLogger } from '/@/composables'
import { TresAttributes, TresCatalogue, TresInstance, TresVNode, TresVNodeType } from '/@/types'

const VECTOR3_PROPS = ['rotation', 'scale', 'position']

export function useInstanceCreator(prefix: string) {
  const { logMessage, logError } = useLogger()

  function processSetAttributes(props: Record<string, any>, instance: TresInstance) {
    if (!isDefined(props)) return
    if (!isDefined(instance)) return

    Object.entries(props).forEach(([key, value]) => {
      const camelKey = key.replace(/(-\w)/g, m => m[1].toUpperCase())
      instance.setAttribute(camelKey, new BufferAttribute(...(value as ConstructorParameters<typeof BufferAttribute>)))
    })
  }

  function processProps(props: Record<string, any>, instance: TresInstance) {
    if (!isDefined(props)) return
    if (!isDefined(instance)) return

    Object.entries(props).forEach(([key, value]) => {
      const camelKey = key.replace(/(-\w)/g, m => m[1].toUpperCase())

      // Ignore property args which is use for initial instance construction
      if (camelKey === 'args' || value === undefined) return

      // Normalize vector3 props
      if (VECTOR3_PROPS.includes(camelKey) && value) {
        value = normalizeVectorFlexibleParam(value)
      }

      if (props.ref) {
        props.ref = instance
      }

      try {
        // Check if the property has a "set" method
        if (instance[camelKey] && isDefined(instance[camelKey].set)) {
          // Call the "set" method with the value, spread if it's an array
          instance[camelKey].set(...(isArray(value) ? value : [value]))
        } else {
          // Convert empty strings to `true`
          if (value === '') {
            value = true
          }

          // Check if the property is a function
          if (isFunction(instance[camelKey])) {
            if (key === 'center' && !value) return
            // Call the function with the value, spread if it's an array
            instance[camelKey](...(isArray(value) ? value : [value]))
            return
          }

          // Set the property to the value
          instance[camelKey] = value
        }
      } catch (error: unknown) {
        logError(`There was an error setting ${camelKey} property`, error as Error)
      }
    })
  }

  function createInstanceFromVNode(vnode: TresVNode): TresInstance | TresInstance[] | undefined {
    const fragmentRegex = /^Symbol\(Fragment\)$/g
    const textRegex = /^Symbol\(Text\)$/g
    // Check if the vnode is a Fragment
    if (fragmentRegex.test(vnode.type.toString())) {
      return vnode.children.map(child => createInstanceFromVNode(child as TresVNode)) as TresInstance[]
    } else if (textRegex.test(vnode.type.toString())) {
      return
    } else {
      const vNodeType = ((vnode.type as TresVNodeType).name as string).replace(prefix, '')
      const { catalogue: fallback } = useCatalogue()
      const catalogue = inject<Ref<TresCatalogue>>('catalogue') || fallback
      // check if args prop is defined on the vnode
      let internalInstance
      if (catalogue) {
        if (vnode?.props?.args) {
          // if args prop is defined, create new instance of catalogue[vNodeType] with the provided arguments
          if (catalogue?.value[vNodeType]) {
            internalInstance = new catalogue.value[vNodeType](...vnode.props.args)
          } else {
            logError(`There is no ${vNodeType} in the catalogue`, catalogue?.value.uuid)
          }
        } else {
          // if args prop is not defined, create a new instance of catalogue[vNodeType] without arguments
          internalInstance = new catalogue.value[vNodeType]()
        }
      }

      // check if props is defined on the vnode
      if (vnode?.props) {
        // if props is defined, process the props and pass the internalInstance to update its properties
        if (vNodeType === 'BufferGeometry') {
          processSetAttributes(vnode.props, internalInstance)
        } else {
          processProps(vnode.props, internalInstance)
        }
      }

      return internalInstance
    }
  }

  function createInstance(threeObj: any, attrs: TresAttributes, slots: Record<string, any>): TresInstance {
    /*
     * Checks if the component has slots,
     * if it does, it will create a new Object3D instance passing the slots instances as properties
     * Example:
     * <TresMesh>
     *  <TresBoxGeometry />
     *  <TresMeshBasicMaterial />
     * </TresMesh>
     * will create a new Mesh instance with a BoxGeometry and a MeshBasicMaterial
     * const mesh = new Mesh(new BoxGeometry(), new MeshBasicMaterial())
     */
    if (slots.default && slots?.default()) {
      const internal = slots.default().map((vnode: TresVNode) => createInstanceFromVNode(vnode))
      return new threeObj(...internal.flat().filter(Boolean))
    } else {
      // Creates a new THREE instance, if args is present, spread it on the constructor
      return attrs.args ? new threeObj(...attrs.args) : new threeObj()
    }
  }

  function createComponentInstances(catalogue: Ref<TresCatalogue>) {
    return (
      Object.entries(catalogue.value)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_key, value]) => (value as { prototype: any })?.prototype?.constructor?.toString().includes('class'))
        .map(([key, threeObj]) => {
          const name = `${prefix}${key}`
          const cmp = defineComponent({
            name,
            setup(props, { slots, attrs, ...ctx }) {
              const { scene: fallback } = useScene()
              const scene = inject<Ref<Scene>>('local-scene') || fallback
              const catalogue = inject<Ref<TresCatalogue>>('catalogue')
              const { pushCamera } = useCamera()

              let instance = createInstance(threeObj, attrs, slots)
              processProps(attrs, instance)
              // If the instance is a camera, push it to the camera stack
              if (instance instanceof PerspectiveCamera || instance instanceof OrthographicCamera) {
                pushCamera(instance)
              }

              // If the instance is a valid Object3D, add it to the scene
              if (instance.isObject3D) {
                scene?.value.add(instance)
              }

              if (scene?.value && instance.isFog) {
                scene.value.fog = instance as unknown as FogBase
              }

              if (import.meta.hot) {
                import.meta.hot.on('vite:beforeUpdate', () => {
                  scene.value.remove(instance)
                })

                import.meta.hot.on('vite:afterUpdate', () => {
                  instance = createInstance(threeObj, attrs, slots)
                  processProps(attrs, instance)

                  if (instance.isObject3D) {
                    scene?.value.add(instance)
                  }

                  logMessage(name, {
                    instance,
                    sceneuuid: scene?.value.uuid,
                    catalogue: catalogue?.value.uuid,
                    props,
                    slots: slots.default ? slots.default() : undefined,
                    attrs,
                    ctx,
                    scene,
                  })
                })
              }

              ctx.expose(instance)
              logMessage(name, {
                sceneuuid: scene?.value.uuid,
                catalogue: catalogue?.value.uuid,
                props,
                slots: slots.default ? slots.default() : undefined,
                attrs,
                ctx,
                scene,
              })
              return () => {}
            },
          })

          return [name, cmp]
        })
    )
  }

  return {
    createComponentInstances,
    processProps,
    createInstanceFromVNode,
  }
}
