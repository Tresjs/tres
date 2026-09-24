export function createRetargetingProxy<T extends Record<string | number | symbol, any>, K extends keyof T & string & symbol>(
  target: T,
  getters = {} as Record<string | number | symbol, (t: T) => unknown>,
  setters = {} as Record<K, (val: T[K], t: T, proxy: T, setTarget: (newTarget: T) => void) => boolean>,
) {
  let _target = target

  const setTarget = (newTarget: T) => {
    _target = newTarget
  }

  let proxy = new Proxy({}, {}) as T

  const handler: ProxyHandler<any> = {
    has(_: any, key: string | number | symbol) {
      return Object.hasOwn(getters, key) || (key in _target)
    },
    get(_: any, prop: keyof T, __: any) {
      if (Object.hasOwn(getters, prop)) {
        return getters[prop](_target)
      }
      return _target[prop]
    },
    set(_: any, prop: K, val: T[K]) {
      if (Object.hasOwn(setters, prop)) {
        setters[prop](val, _target, proxy, setTarget)
      }
      else {
        _target[prop] = val
      }
      return true
    },
  }

  proxy = new Proxy({}, handler) as T

  return proxy
}
