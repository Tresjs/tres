import type { TresNodeOpsPlugin } from 'src/core/nodeOps'
import type { Object3D } from 'three'
import type { TresContext } from '../composables'
import { useRenderLoop } from '../composables'

function setup(context: TresContext) {
  const divToObject3D = new Map<HTMLDivElement, Object3D | null>()

  const loopAPI = useRenderLoop().onLoop(({ delta }) => {
    const width = window.innerWidth, height = window.innerHeight
    const widthHalf = width / 2, heightHalf = height / 2
    for (const [div, obj] of divToObject3D.entries()) {
      if (obj && context.camera.value) {
        const pos = obj.position.clone()
        pos.project(context.camera.value)
        pos.x = ( pos.x * widthHalf ) + widthHalf
        pos.y = - ( pos.y * heightHalf ) + heightHalf
        if (pos.y < 0 || pos.y > height - 30 || pos.x < 0 || pos.x > width - 60) {
          div.style.display = 'none'
        }
        else {
          div.style.display = 'block'
          div.style.left = `${(pos.x + 10).toString()}px`
          div.style.top = `${(pos.y + 5).toString()}px`
        }
      } 
      else {
        div.style.display = 'none'
      }
    }
  })

  const create = (text: string): HTMLDivElement | null => {
    if (!text) return null
    const result = document.createElement('div')
    result.className = 'tres-text'
    result.innerText = text
    result.style.position = 'absolute'
    result.style.zIndex = '2'
    divToObject3D.set(result, null)
    return result
  }
  
  const insert = (div: HTMLDivElement, obj: Object3D) => {
    divToObject3D.set(div, obj)
    if (context.renderer.value.domElement) {
      context.renderer.value.domElement?.parentNode?.prepend(div)
    }
  }

  const remove = (div: HTMLDivElement) => {
    divToObject3D.delete(div)
  }

  const patch = (div: HTMLDivElement, text: string) => {
    div.textContent = text
  }

  const has = (div: HTMLDivElement) => divToObject3D.has(div)

  const dispose = () => {
    for (const div of divToObject3D.keys()) {
      remove(div)
    }
    loopAPI.off()
  }

  return { create, insert, remove, patch, has, dispose }
}

export const plugin: TresNodeOpsPlugin<HTMLElement, HTMLElement, TresContext> = (
  context: TresContext,
) => {
  const { create: createText, insert, remove, patch, has, dispose } = setup(context)

  return {
    name: 'Text plugin',
    filter: {
      node: (a: any): a is HTMLDivElement => has(a),
      element: (a: any): a is HTMLDivElement => has(a),
    },
    createText,
    insert(child: HTMLDivElement, parent: any) {
      if (parent && parent.isObject3D) {
        insert(child, parent)
      }
    },
    remove,
    setText: (node: HTMLDivElement, text: string) => {
      patch(node, text)
    },
    setElementText: (el: HTMLDivElement, text: string) => {
      patch(el, text)
    },
    dispose,
  }
}
