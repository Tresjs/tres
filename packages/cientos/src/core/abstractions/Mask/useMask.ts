import { EqualStencilFunc, KeepStencilOp, NotEqualStencilFunc } from 'three'
import type { Ref } from 'vue'
import { reactive, toValue, watchEffect } from 'vue'

export function useMask(id: Ref<number> | number, inverse: Ref<boolean> | boolean = false) {
  const result = reactive({
    stencilWrite: true,
    stencilRef: toValue(id),
    stencilFunc: toValue(inverse) ? NotEqualStencilFunc : EqualStencilFunc,
    stencilFail: KeepStencilOp,
    stencilZFail: KeepStencilOp,
    stencilZPass: KeepStencilOp,
  })

  watchEffect(() => {
    result.stencilRef = toValue(id)
    result.stencilFunc = toValue(inverse) ? NotEqualStencilFunc : EqualStencilFunc
  })

  return result
}
