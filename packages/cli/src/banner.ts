import { bold, gray, lightGreen, yellow } from 'kolorist'

/**
 * Brand mark shared with `create-tres`: three shapes for "Tres".
 * kolorist no-ops when NO_COLOR is set or stdout is not a TTY.
 */
export function banner(): string {
  return `${lightGreen('▲')} ${gray('■')} ${yellow('●')} ${bold('Tres')}`
}
