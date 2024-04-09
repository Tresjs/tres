import { ArrowHelper } from 'three'
import type { Ref } from 'vue'
import { extractBindingPosition } from '../utils'
import type { TresObject } from '../types'
import { useLogger } from '../composables'

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
    el.parent.remove(arrowHelper)
  },
}
