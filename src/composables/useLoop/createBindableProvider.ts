import { injectLocal, provideLocal } from '@vueuse/core'

export interface Bindable<BindingArg> {
  bind: (b: BindingArg) => boolean
}

export function createBindableProvider<BindingArg>(
  create: () => Bindable<BindingArg>,
  provideSymbol = Symbol('unnamed'),
  provide = provideLocal,
  inject = injectLocal,
) {
/**
 * Returns a Bindable, either by finding one in the `provide`
 * or by creating a new one.
 */
  function get(): Bindable<BindingArg> {
    let result = inject(provideSymbol, create, true)
    if (!result) {
      result = create()
      provide(provideSymbol, result)
    }
    return result
  }

  /**
   * Binds a Bindable, either by finding an unbound one in
   * the `provide` or by creating a new one.
   */
  const bind = (arg: BindingArg): Bindable<BindingArg> => {
    let result = inject(provideSymbol, create, true)
    if (!result || !result.bind(arg)) {
      result = create()
      result.bind(arg)
      provide(provideSymbol, result)
    }
    return result
  }

  return {
    get,
    bind,
  }
}
