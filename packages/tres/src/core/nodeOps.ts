import { useCamera, useRaycaster, useRenderLoop } from '/@/composables'
import { RendererOptions } from 'vue'
import { useLogger } from '/@/composables'
import { catalogue } from './catalogue'
import { Mesh } from 'three'
import { useEventListener } from '@vueuse/core'
import { TresEvent, TresObject } from '../types'

const HTML_TAGS =
  'html,body,base,head,link,meta,style,title,address,article,aside,footer,' +
  'header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,' +
  'figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,' +
  'data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,' +
  'time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,' +
  'canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,' +
  'th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,' +
  'option,output,progress,select,textarea,details,dialog,menu,' +
  'summary,template,blockquote,iframe,tfoot'

export const isHTMLTag = /*#__PURE__*/ makeMap(HTML_TAGS)

export function makeMap(str: string, expectsLowerCase?: boolean): (key: string) => boolean {
  const map: Record<string, boolean> = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val]
}

const { logWarning } = useLogger()

function hasEvents(obj: any) {
  for (const prop in obj) {
    if (prop.indexOf('on') === 0) {
      return true
    }
  }
  return false
}

function noop(fn: string): any {
  fn
}

const doc = (typeof document !== 'undefined' ? document : null) as Document
export const svgNS = 'http://www.w3.org/2000/svg'

const templateContainer = doc && /*#__PURE__*/ doc.createElement('template')

let scene = null

export const nodeOps: RendererOptions<any, any> = {
  createElement(tag, isSVG, anchor, props) {
    // Vue core
    /* const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, anchor ? { anchor } : undefined)

    if (tag === 'select' && props && props.multiple != null) {
      ;(el as HTMLSelectElement).setAttribute('multiple', props.multiple)
    }

    return el */
    // Tres
    if (tag === 'template') return null
    if (isHTMLTag(tag)) return null
    let instance

    if (props === null) {
      props = {}
    }

    if (props?.arg) {
      instance = new catalogue[tag.replace('Tres', '')](...props.args)
    } else {
      instance = new catalogue[tag.replace('Tres', '')]()
    }

    if (instance.isCamera) {
      // Let users know that camera is in the center of the scene
      if (!props?.position || props?.position.every((v: number) => v == 0)) {
        logWarning(
          // eslint-disable-next-line max-len
          'Camera is positioned at the center of the scene [0,0,0], if this is not intentional try setting a position if your scene seems empty 🤗',
        )
      }
      const { pushCamera } = useCamera()
      pushCamera(instance)
    }

    if (props?.attach === undefined) {
      if (instance.isMaterial) instance.attach = 'material'
      else if (instance.isBufferGeometry) instance.attach = 'geometry'
    }

    console.log({
      tag,

      instance,
      threeObj: catalogue[tag.replace('Tres', '')],
    })

    return instance
  },
  insert(child, parent, anchor) {
    if (scene === null && parent.isScene) scene = parent
    if (parent === null) parent = scene
    //vue core
    /*  parent.insertBefore(child, anchor || null) */
    if (parent?.isObject3D && child?.isObject3D) {
      console.log('insert', { child, parent, anchor })
      const index = anchor ? parent.children.indexOf(anchor) : 0
      child.parent = parent
      parent.children.splice(index, 0, child)
      child.dispatchEvent({ type: 'added' })
    } else if (typeof child?.attach === 'string') {
      child.__previousAttach = child[parent?.attach]
      if (parent) {
        parent[child.attach] = child
      }
    }

    const { onLoop } = useRenderLoop()

    // RayCasting
    let prevInstance: TresEvent | null = null
    let currentInstance: TresEvent | null = null

    const { raycaster } = useRaycaster()
    if (child && child instanceof Mesh && hasEvents(child)) {
      onLoop(() => {
        if (parent?.children && child && raycaster) {
          const intersects = raycaster.value.intersectObjects(parent.children)

          if (intersects.length > 0 && intersects[0].object.uuid === child.uuid) {
            currentInstance = intersects[0]

            if (prevInstance === null || prevInstance.object.uuid !== currentInstance?.object.uuid) {
              child.onPointerEnter?.(currentInstance)
            }

            child.onPointerMove?.(currentInstance)
          } else {
            currentInstance = null
            if (prevInstance !== null) {
              child.onPointerLeave?.(prevInstance)
            }
          }

          prevInstance = currentInstance
        }
      })

      useEventListener(window, 'click', () => {
        if (currentInstance === null) return
        child.onClick?.(currentInstance)
      })
    }
  },
  remove(node) {
    // Vue Core
    const parent = node.parentNode
    if (parent) {
      parent.removeChild(node)
    }
    /* if (!node) return
    const parent = node.parent
    if (parent) {
      if (parent.isObject3D && node.isObject3D) {
        parent.remove(node)
      } else if (typeof node.attach === 'string') {
        parent[node.attach] = node.__previousAttach
        delete node.__previousAttach
        node.parent = null
      }
    }

    node.dispose?.()
    node.traverse?.(node => {
      ;(node as TresObject).dispose?.()
    }) */
  },
  patchProp(node, prop, prevValue, nextValue) {
    if (node) {
      let root = node
      let key = prop
      let target = root?.[key]
      // Traverse pierced props (e.g. foo-bar=value => foo.bar = value)
      /* if (key.includes('-')) {
        const chain = key.split('-')
        target = chain.reduce((acc, key) => acc[key], root)
        key = chain.pop() as string
  
        if (!target?.set) root = chain.reduce((acc, key) => acc[key], root)
      } */
      const value = nextValue
      /*   try {
        const num = parseFloat(value)
        value = isNaN(num) ? value : num
      } catch (_) {} */
      // Set prop, prefer atomic methods if applicable
      if (!target?.set) root[key] = value
      else if (target.constructor === value.constructor && target?.copy) target?.copy(value)
      else if (Array.isArray(value)) target.set(...value)
      else if (!target.isColor && target.setScalar) target.setScalar(value)
      else target.set(value)
    }
  },

  parentNode(node) {
    // Vue core
    return node.parentNode as Element | null
    /*  return node?.parent || null */
  },
  createText: text => doc.createTextNode(text),

  createComment: text => doc.createComment(text),

  setText: (node, text) => {
    node.nodeValue = text
  },

  setElementText: (el, text) => {
    el.textContent = text
  },
  nextSibling: node => node.nextSibling,

  querySelector: selector => doc.querySelector(selector),

  setScopeId(el, id) {
    /* el.setAttribute(id, '') */
  },
  cloneNode: () => noop('cloneNode'),
  insertStaticContent: () => noop('insertStaticContent'),

  /* nextSibling(node) {
    if (node?.parent?.children) {
      const index = node.parent.children.indexOf(node)
      if (index !== -1) return node.parent.children[index + 1]
    }
    return null
  }, */
}
