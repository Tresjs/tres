import * as THREE from 'three'
import { BufferAttribute } from 'three'
import { isFunction } from '@alvarosabu/utils'
import type { Object3D, Camera } from 'three'
import type { TresNodeOpsPlugin } from '../core/nodeOps'
import type { TresContext } from '../composables'
import { useLogger } from '../composables'
import { deepArrayEqual, kebabToCamel } from '../utils'

import type { TresObject, TresObject3D } from '../types'
import { normalizeVectorFlexibleParam } from '../utils/normalize'
import { catalogue } from './../core/catalogue'

export const plugin: TresNodeOpsPlugin<TresObject, TresObject, TresContext> = (
  context: TresContext,
) => {
  context.extend(THREE)
  const { logError } = useLogger()
  const supportedPointerEvents = [
    'onClick',
    'onPointerMove',
    'onPointerEnter',
    'onPointerLeave',
  ]

  return {
    name: 'Tres/Three Core NodeOps plugin',
    filter: {
      tag: (tag: string) => {
        tag = tag.startsWith('Tres') ? tag.substring(4) : tag
        return tag in catalogue.value || tag === 'primitive'
      },
      element: (a: any): a is TresObject =>
        a && (a.isObject3D || a.isBufferGeometry || a.isMaterial || a.isFog),
      node: (a: any): a is TresObject =>
        a && (a.isObject3D || a.isBufferGeometry || a.isMaterial || a.isFog),
    },
    createElement: (tag, _isSVG, _anchor, props) => {
      if (!props) props = {}
      if (!props.args) props.args = []

      let name = tag.replace('Tres', '')
      let instance

      if (tag === 'primitive') {
        if (props?.object === undefined)
          logError('Tres primitives need a prop \'object\'')
        const object = props.object as TresObject
        name = object.type
        instance = Object.assign(object, {
          type: name,
          attach: props.attach,
          primitive: true,
        })
      }
      else {
        const target = catalogue.value[name]
        if (!target) {
          logError(
            `${name} is not defined on the THREE namespace. Use extend to add it to the catalog.`,
          )
        }
        instance = new target(...props.args)
      }

      if (instance.isCamera) {
        if (!props?.position) {
          instance.position.set(3, 3, 3)
        }
        if (!props?.lookAt) {
          instance.lookAt(0, 0, 0)
        }
      }

      if (props?.attach === undefined) {
        if (instance.isMaterial) instance.attach = 'material'
        else if (instance.isBufferGeometry) instance.attach = 'geometry'
      }

      // determine whether the material was passed via prop to
      // prevent it's disposal when node is removed later in it's lifecycle

      if (instance.isObject3D) {
        if (props?.material?.isMaterial)
          (instance as TresObject3D).userData.tres__materialViaProp = true
        if (props?.geometry?.isBufferGeometry)
          (instance as TresObject3D).userData.tres__geometryViaProp = true

        if (props.position)
          instance.position.set(
            props.position[0],
            props.position[1],
            props.position[2],
          )
        if (props.rotation) {
          const r = new THREE.Euler(
            ...normalizeVectorFlexibleParam(props.rotation),
          );
          (<Object3D>instance).setRotationFromEuler(r)
        }
      }

      // Since THREE instances properties are not consistent, (Orbit Controls doesn't have a `type` property)
      // we take the tag name and we save it on the userData for later use in the re-instancing process.
      instance.userData = {
        ...instance.userData,
        tres__name: name,
      }

      return instance
    },

    insert: (child, parent) => {
      const parentObject = parent || context.scene.value

      if (child?.isObject3D) {
        if (child?.isCamera) {
          if (!context.registerCamera)
            throw 'could not find tres__registerCamera on scene\'s userData'

          context.registerCamera(child as unknown as Camera)
        }

        if (
          child
          && supportedPointerEvents.some(eventName => child[eventName])
        ) {
          if (
            !context.scene.value?.userData.tres__registerAtPointerEventHandler
          )
            throw 'could not find tres__registerAtPointerEventHandler on scene\'s userData'

          context.scene.value?.userData.tres__registerAtPointerEventHandler?.(
            child as Object3D,
          )
        }
      }

      if (child?.isObject3D && parentObject?.isObject3D) {
        parentObject.add(child)
        child.dispatchEvent({ type: 'added' })
      }
      else if (child?.isFog) {
        parentObject.fog = child
      }
      else if (typeof child?.attach === 'string') {
        child.__previousAttach = child[parentObject?.attach as string]
        if (parentObject) {
          parentObject[child.attach] = child
        }
      }
    },

    remove: (node: TresObject) => {
      if (node.isObject3D) {
        const scene = context.scene?.value
        const object3D = node as unknown as Object3D

        const disposeMaterialsAndGeometries = (object3D: Object3D) => {
          const tresObject3D = object3D as TresObject3D

          if (!object3D.userData.tres__materialViaProp) {
            tresObject3D.material?.dispose()
            tresObject3D.material = undefined
          }

          if (!object3D.userData.tres__geometryViaProp) {
            tresObject3D.geometry?.dispose()
            tresObject3D.geometry = undefined
          }
        }

        const deregisterAtPointerEventHandler
          = scene?.userData.tres__deregisterAtPointerEventHandler
        const deregisterBlockingObjectAtPointerEventHandler
          = scene?.userData.tres__deregisterBlockingObjectAtPointerEventHandler

        const deregisterAtPointerEventHandlerIfRequired = (
          object: TresObject,
        ) => {
          if (!deregisterBlockingObjectAtPointerEventHandler)
            throw 'could not find tres__deregisterBlockingObjectAtPointerEventHandler on scene\'s userData'

          scene?.userData.tres__deregisterBlockingObjectAtPointerEventHandler?.(
            object as Object3D,
          )

          if (!deregisterAtPointerEventHandler)
            throw 'could not find tres__deregisterAtPointerEventHandler on scene\'s userData'

          if (
            object
            && supportedPointerEvents.some(eventName => object[eventName])
          )
            deregisterAtPointerEventHandler?.(object as Object3D)
        }

        const deregisterCameraIfRequired = (object: Object3D) => {
          const deregisterCamera = scene?.userData.tres__deregisterCamera

          if (!deregisterCamera)
            throw 'could not find tres__deregisterCamera on scene\'s userData'

          if ((object as Camera).isCamera) deregisterCamera?.(object as Camera)
        }

        node.removeFromParent?.()
        object3D.traverse((child: Object3D) => {
          disposeMaterialsAndGeometries(child)
          deregisterCameraIfRequired(child)
          deregisterAtPointerEventHandlerIfRequired?.(child as TresObject)
        })

        disposeMaterialsAndGeometries(object3D)
        deregisterCameraIfRequired(object3D)
        deregisterAtPointerEventHandlerIfRequired?.(object3D as TresObject)
      }

      node.dispose?.()
    },

    patchProp: (node: TresObject, prop, prevValue, nextValue) => {
      const scene = context.scene.value
      let root = node
      let key = prop
      if (node.isObject3D && key === 'blocks-pointer-events') {
        if (nextValue || nextValue === '')
          scene?.userData.tres__registerBlockingObjectAtPointerEventHandler?.(
            node as Object3D,
          )
        else
          scene?.userData.tres__deregisterBlockingObjectAtPointerEventHandler?.(
            node as Object3D,
          )

        return
      }

      let finalKey = kebabToCamel(key)
      let target = root?.[finalKey]

      if (key === 'args') {
        const prevNode = node as TresObject3D
        const prevArgs = prevValue ?? []
        const args = nextValue ?? []
        const instanceName = node.userData.tres__name || node.type

        if (
          instanceName
          && prevArgs.length
          && !deepArrayEqual(prevArgs, args)
        ) {
          root = Object.assign(
            prevNode,
            new catalogue.value[instanceName](...nextValue),
          )
        }
        return
      }

      if (root.type === 'BufferGeometry') {
        if (key === 'args') return
        root.setAttribute(
          kebabToCamel(key),
          new BufferAttribute(
            ...(nextValue as ConstructorParameters<typeof BufferAttribute>),
          ),
        )
        return
      }

      // Traverse pierced props (e.g. foo-bar=value => foo.bar = value)
      if (key.includes('-') && target === undefined) {
        const chain = key.split('-')
        target = chain.reduce((acc, key) => acc[kebabToCamel(key)], root)
        key = chain.pop() as string
        finalKey = key.toLowerCase()
        if (!target?.set)
          root = chain.reduce((acc, key) => acc[kebabToCamel(key)], root)
      }
      let value = nextValue
      if (value === '') value = true
      // Set prop, prefer atomic methods if applicable
      if (isFunction(target)) {
        //don't call pointer event callback functions
        if (!supportedPointerEvents.includes(prop)) {
          if (Array.isArray(value)) node[finalKey](...value)
          else node[finalKey](value)
        }
        return
      }
      if (!target?.set && !isFunction(target)) root[finalKey] = value
      else if (target.constructor === value.constructor && target?.copy)
        target?.copy(value)
      else if (Array.isArray(value)) target.set(...value)
      else if (!target.isColor && target.setScalar) target.setScalar(value)
      else target.set(value)
    },

    parentNode: (node: TresObject) => node?.parent || null,
  }
}
