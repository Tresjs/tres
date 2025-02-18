import { isProd, useLogger } from '../../composables'

export function addDeprecatedMethods<T extends Record<string, any>>(events: T): T {
  let hasWarned = false
  const { logWarning } = useLogger()
  // @ts-expect-error Method doesn't exist on type.
  events.forceUpdate = () => {
    if (!isProd && !hasWarned) {
      hasWarned = true
      logWarning(`\`events.forceUpdate\` is deprecated. Use \`events.update\`.`)
    }
    events.update()
  }

  return events
}
