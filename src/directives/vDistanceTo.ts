import type { Ref } from 'vue'
import type { TresObject } from '../types'
import { ArrowHelper } from 'three'
import { useLogger } from '../composables'
import { extractBindingPosition } from '../utils'

const { logWarning } = useLogger()

let arrowHelper: ArrowHelper | null = null

export const vDistanceTo = {
  updated: (el: TresObject, binding: Ref<TresObject>) => {
    const observer = extractBindingPosition(binding)
    if (!observer) {
      logWarning(`v-distance-to: problem with binding value: ${binding.value}`)
      return
    }
    if (arrowHelper) {
      arrowHelper.dispose()
      el.parent.remove(arrowHelper)
    }
    const dir = observer.clone().sub(el.position)
    dir.normalize()
    arrowHelper = new ArrowHelper(dir, el.position, el.position.distanceTo(observer), 0xFFFF00)
    el.parent.add(arrowHelper)
    // eslint-disable-next-line no-console
    console.table([
      ['Distance:', el.position.distanceTo(observer)],
      [`origin: ${el.name || el.type}`, `x:${el.position.x}, y:${el.position.y}, z:${el.position?.z}`],
      [`Destiny: ${el.name || el.type}`, `x:${observer.x}, y:${observer.y}, z:${observer?.z}`],
    ],
    )
  },
  unmounted: (el: TresObject) => {
    arrowHelper?.dispose()
    if (el.parent) {
      el.parent.remove(arrowHelper)
    }
  },
}
