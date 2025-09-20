import type { TresContext } from '../composables'
import type { TresObject } from './../types'
import {
  setupDevtoolsPlugin,
} from '@vue/devtools-api'
import type { Mesh } from 'three'
import type { App } from 'vue'
import { toastMessage } from './utils'
import { setupTresDevtools } from './setupDevtools'
import { inspectorEditStateHandler, inspectorStateHandler, inspectorTreeHandler } from './inspectorHandlers'

export interface Tags {
  label: string
  textColor: number
  backgroundColor: number
  tooltip?: string
}

export const INSPECTOR_ID = 'tres:inspector'

export function registerTresDevtools(app: App, tres: TresContext) {
  const pluginDescriptor = {
    id: 'dev.esm.tres',
    label: 'TresJS 🪐',
    logo: 'https://raw.githubusercontent.com/Tresjs/tres/main/public/favicon.svg',
    packageName: 'tresjs',
    homepage: 'https://docs.tresjs.org',
    app,
  }
  const highlightMesh: Mesh | null = null
  const prevInstance: TresObject | null = null

  setupTresDevtools(tres)
  setupDevtoolsPlugin(
    pluginDescriptor,
    (api) => {
      if (typeof api.now !== 'function') {
        toastMessage(
          'You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.',
        )
      }

      api.addInspector({
        id: INSPECTOR_ID,
        label: 'TresJS 🪐',
        icon: 'account_tree',
        treeFilterPlaceholder: 'Search instances',
      })

      setInterval(() => {
        api.sendInspectorTree(INSPECTOR_ID)
      }, 1000)

      setInterval(() => {
        api.notifyComponentUpdate()
      }, 5000)

      api.on.getInspectorTree(inspectorTreeHandler(tres))

      api.on.getInspectorState(inspectorStateHandler(tres, {
        highlightMesh,
        prevInstance,
      }))

      api.on.editInspectorState(inspectorEditStateHandler(tres))
    },
  )
}
