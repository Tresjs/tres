import { REVISION } from 'three'

// REVISION can be '{number}' or '{number}dev'
export const revision = Number.parseInt(REVISION.replace('dev', ''))
