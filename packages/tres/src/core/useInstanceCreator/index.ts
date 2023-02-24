/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-empty-function */
import { BufferAttribute, Fog, FogBase, Mesh, OrthographicCamera, PerspectiveCamera } from 'three'
import { defineComponent, inject, onUnmounted, Ref } from 'vue'
import { useEventListener } from '@vueuse/core'

import { isArray, isDefined, isFunction } from '@alvarosabu/utils'
import { normalizeVectorFlexibleParam } from '/@/utils/normalize'
import { useCamera, useCatalogue, useRenderLoop, useTres } from '/@/core/'
import { useLogger } from '/@/composables'
import { TresAttributes, TresCatalogue, TresInstance, TresVNode, TresVNodeType, TresEvent } from '/@/types'

const VECTOR3_PROPS = ['rotation', 'scale', 'position']

/**
 * Composable responsible for creating instances out of Three.js objects.
 *
 * @export
 * @param {string} prefix
 * @return {*}
 */
export function useInstanceCreator(prefix: string) {
  const { /* logMessage, */ logError } = useLogger()

  /**
   * Process props to `.setAttribute` on instance.
   *
   * @example `position` prop will be converted to `setPosition` method call.
   *
   * @param {Record<string, any>} props
   * @param {TresInstance} instance
   */
  function processSetAttributes(props: Record<string, any>, instance: TresInstance) {
    if (!isDefined(props)) return
    if (!isDefined(instance)) return

    Object.entries(props).forEach(([key, value]) => {
      const camelKey = key.replace(/(-\w)/g, m => m[1].toUpperCase())
      instance.setAttribute(camelKey, new BufferAttribute(...(value as ConstructorParameters<typeof BufferAttribute>)))
    })
  }

  /**
   *  Process props to set properties on instance.
   *
   * It will also normalize vector3 props and check if the instances property has a `set` method.
   * If it does, it will call the `set` method with the value, spread if it's an array.
   *
   * @example `position=[0,0,0]` prop will be converted to `instance.position.set(0,0,0)` property.
   *
   * @param {Record<string, any>} props
   * @param {TresInstance} instance
   */
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

  /**
   * Proccess slots to add children to instance.
   *
   * @param {TresVNode} vnode
   * @return {*}  {(TresInstance | TresInstance[] | undefined)}
   */
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
        if ((vnode.children as unknown as { default: any })?.default) {
          const internal = (vnode.children as unknown as { default: any })
            .default()
            .map((child: TresVNode) => createInstanceFromVNode(child)) as TresInstance[]

          internalInstance = new catalogue.value[vNodeType](...internal.flat().filter(Boolean))
        } else if (vnode?.props?.args) {
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

  /**
   * Create a new instance of a ThreeJS object based on the component attrs and slots.
   *
   * Checks if the component has slots,
   * if it does, it will create a new Object3D instance passing the slots instances as properties
   * Example:
   *
   * ```vue
   * <TresMesh>
   *  <TresBoxGeometry />
   *  <TresMeshBasicMaterial />
   * </TresMesh>
   * ```
   *
   * will create a new Mesh instance with a BoxGeometry and a MeshBasicMaterial
   * const mesh = new Mesh(new BoxGeometry(), new MeshBasicMaterial())
   *
   * @param {*} threeObj
   * @param {TresAttributes} attrs
   * @param {Record<string, any>} slots
   * @return {*}  {TresInstance}
   */
  function createInstance(threeObj: any, attrs: TresAttributes, slots: Record<string, any>): TresInstance {
    if (slots.default && slots?.default()) {
      const internal = slots.default().map((vnode: TresVNode) => createInstanceFromVNode(vnode))
      if (threeObj.name === 'Group') {
        const group = new threeObj()
        internal.forEach((child: TresInstance) => {
          group.add(child)
        })
        return group
      } else {
        return new threeObj(...internal.flat().filter(Boolean))
      }
    } else {
      // Creates a new THREE instance, if args is present, spread it on the constructor
      return attrs.args ? new threeObj(...attrs.args) : new threeObj()
    }
  }

  /**
   * Creates a new component instance for each object in the catalogue
   *
   * @param {Ref<TresCatalogue>} catalogue
   * @return {*}
   */
  function createComponentInstances(catalogue: Ref<TresCatalogue>) {
    return (
      Object.entries(catalogue.value)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_key, value]) => (value as { prototype: any })?.prototype?.constructor?.toString().includes('class'))
        .map(([key, threeObj]) => {
          const name = `${prefix}${key}`
          const cmp = defineComponent({
            name,
            setup(_props, { slots, attrs, ...ctx }) {
              const { state } = useTres()
              const { onLoop } = useRenderLoop()
              const scene = state.scene
              const raycaster = state.raycaster
              const { pushCamera } = useCamera()

              let instance = createInstance(threeObj, attrs, slots)
              processProps(attrs, instance)
              // If the instance is a camera, push it to the camera stack
              if (instance instanceof PerspectiveCamera || instance instanceof OrthographicCamera) {
                pushCamera(instance)
              }

              // If the instance is a valid Object3D, add it to the scene
              if (instance.isObject3D) {
                scene?.add(instance)
              }

              let prevInstance: TresEvent | null = null
              let currentInstance: TresEvent | null = null
              if (instance instanceof Mesh) {
                onLoop(() => {
                  if (instance && raycaster && scene?.children) {
                    const intersects = raycaster.intersectObjects(scene?.children)

                    if (intersects.length > 0) {
                      currentInstance = intersects[0]

                      if (prevInstance === null || prevInstance.object.uuid !== currentInstance?.object.uuid) {
                        ctx.emit('pointer-enter', currentInstance)
                      }

                      ctx.emit('pointer-move', currentInstance)
                    } else {
                      currentInstance = null
                      if (prevInstance !== null) {
                        ctx.emit('pointer-leave', prevInstance)
                      }
                    }

                    prevInstance = currentInstance
                  }
                })

                const clickEventListener = useEventListener(window, 'click', () => {
                  ctx.emit('click', prevInstance)
                })

                onUnmounted(() => {
                  clickEventListener()
                })
              }

              if (scene && instance instanceof Fog) {
                scene.fog = instance as unknown as FogBase
              }

              if (import.meta.hot) {
                import.meta.hot.on('vite:afterUpdate', () => {
                  instance = createInstance(threeObj, attrs, slots)
                  processProps(attrs, instance)

                  if (instance.isObject3D) {
                    scene?.add(instance)
                  }
                })
              }

              ctx.expose(instance)

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
