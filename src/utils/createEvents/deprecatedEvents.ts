import { isProd, useLogger } from '../../composables'

const { logWarning } = useLogger()

const DEPRECATED_TRES_TO_TRES: Record<string, string> = {
  onContextMenu: 'onContextmenu',
  onPointerMove: 'onPointermove',
  onPointerEnter: 'onPointerenter',
  onPointerLeave: 'onPointerleave',
  onPointerOver: 'onPointerover',
  onPointerOut: 'onPointerout',
  onDoubleClick: 'onDblclick',
  onPointerDown: 'onPointerdown',
  onPointerUp: 'onPointerup',
  onPointerCancel: 'onPointercancel',
  onPointerMissed: 'onPointermissed',
  onLostPointerCapture: 'onLostpointercapture',
}

const DEPRECATED_TRES_TO_DEPRECATED_VUE: Record<string, string> = {
  onContextMenu: '@context-menu',
  onPointerMove: '@pointer-move',
  onPointerEnter: '@pointer-enter',
  onPointerLeave: '@pointer-leave',
  onPointerOver: '@pointer-over',
  onPointerOut: '@pointer-out',
  onDoubleClick: '@double-click',
  onPointerDown: '@pointer-down',
  onPointerUp: '@pointer-up',
  onPointerCancel: '@pointer-cancel',
  onPointerMissed: '@pointer-missed',
  onLostPointerCapture: '@lost-pointer-capture',
}

const DEPRECATED_TRES_TO_VUE: Record<string, string> = {
  onContextMenu: '@contextmenu',
  onPointerMove: '@pointermove',
  onPointerEnter: '@pointerenter',
  onPointerLeave: '@pointerleave',
  onPointerOver: '@pointerover',
  onPointerOut: '@pointerout',
  onDoubleClick: '@dblclick',
  onPointerDown: '@pointerdown',
  onPointerUp: '@pointerup',
  onPointerCancel: '@pointercancel',
  onPointerMissed: '@pointermissed',
  onLostPointerCapture: '@lostpointercapture',
}

const isDeprecationWarningSentFor: Record<string, boolean> = {
  onContextMenu: false,
  onPointerMove: false,
  onPointerEnter: false,
  onPointerLeave: false,
  onPointerOver: false,
  onPointerOut: false,
  onDoubleClick: false,
  onPointerDown: false,
  onPointerUp: false,
  onPointerCancel: false,
  onPointerMissed: false,
  onLostPointerCapture: false,
}

const deprecatedTresEventRE = new RegExp(`^(${Object.keys(DEPRECATED_TRES_TO_TRES).join('|')})(.*)`)

/**
 * Test if a `onClickSelfOnce`-style string starts with a
 * deprecated event name.
 * If so, warn and return the non-deprecated event name.
 * If not, return the string.
 * @param prop the string to test
 * @returns the non-deprecated name
 */
export function deprecatedEventsToNewEvents(prop: string): string {
  if (deprecatedTresEventRE.test(prop)) {
    const matches = deprecatedTresEventRE.exec(prop)
    if (!matches) { return prop }
    const deprecatedTresName = matches[1]
    if (!isProd && !isDeprecationWarningSentFor[deprecatedTresName]) {
      isDeprecationWarningSentFor[deprecatedTresName] = true
      const deprecatedVueName = DEPRECATED_TRES_TO_DEPRECATED_VUE[deprecatedTresName]
      const supportedVueName = DEPRECATED_TRES_TO_VUE[deprecatedTresName]
      logWarning(`The event \`${deprecatedVueName}\` is deprecated. Use \`${supportedVueName}\`.`)
    }
    return DEPRECATED_TRES_TO_TRES[deprecatedTresName] + (matches[2] ?? '')
  }
  return prop
}
