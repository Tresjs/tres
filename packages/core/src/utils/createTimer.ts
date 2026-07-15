import * as THREE from 'three'
import { revision } from '../core/revision'

/**
 * Minimum Three.js revision that ships the `Timer` class.
 */
const TIMER_MIN_REVISION = 179

export interface TresTimer {
  getDelta: () => number
  getElapsed: () => number
  update: () => void
  start: () => void
  stop: () => void
}

/**
 * Creates a unified timer abstraction that uses `Timer` on Three.js r179+
 * and falls back to `Clock` on older versions.
 *
 * - On r179+: uses `Timer` with its Page Visibility API support (`connect`/`disconnect`).
 * - On older versions: uses `Clock` with `start`/`stop`.
 *
 */
export function createTimer(): TresTimer {
  if (revision >= TIMER_MIN_REVISION) {
    const timer = new THREE.Timer()

    return {
      getDelta: () => timer.getDelta(),
      getElapsed: () => timer.getElapsed(),
      update: () => timer.update(),
      start: () => {
        // connect() enables Page Visibility API to prevent large delta spikes when the
        // tab is hidden; it requires a document reference. Guard for SSR/test environments.
        if (typeof document !== 'undefined') {
          timer.connect(document)
        }
      },
      stop: () => timer.disconnect(),
    }
  }
  else {
    const clock = new THREE.Clock()

    return {
      getDelta: () => clock.getDelta(),
      getElapsed: () => clock.elapsedTime,
      update: () => {},
      start: () => clock.start(), // Clock.start() resets elapsedTime to 0, unlike Timer.connect()
      stop: () => clock.stop(),
    }
  }
}
