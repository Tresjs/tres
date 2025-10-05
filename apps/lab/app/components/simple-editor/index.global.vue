<script setup lang="ts">
import type { Object3D } from 'three'
import { TresCanvas } from '@tresjs/core'
import { TransformControls } from '@tresjs/cientos'
import { useElementSize, useRefHistory, useDark } from '@vueuse/core'

import type { BoxSceneNode, CameraSceneNode, ConeSceneNode, SceneSettings, SphereSceneNode } from './types'

interface State {
  sceneSettings: SceneSettings
  sceneNodes: (CameraSceneNode | BoxSceneNode | SphereSceneNode | ConeSceneNode)[]
}
const state = ref<State>({
  sceneSettings: { width: 800, height: 600 }, sceneNodes: [
    {
      id: crypto.randomUUID(),
      type: 'camera',
      properties: {
        fov: 40,
      },
      position: [0, 5, 50],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
  ]
})
const history = useRefHistory(state, { deep: true })
history.clear()

const isDark = useDark()

const currentCameraName = ref('nav')
const currentCamera = computed(() => ({ render: renderCamRef, nav: navCamRef }[currentCameraName.value]?.value))

const selectedNodeId = ref<string | null>()
watch(selectedNodeId, () => {
}, { immediate: true })
const selectedNode = computed(() => state.value.sceneNodes.find(i => i.id === selectedNodeId.value))
const cameraNode = computed(() => state.value.sceneNodes.find(i => i.type === 'camera') as CameraSceneNode)

type Mode = 'translate' | 'rotate' | 'scale'
const currentMode = ref<Mode>('translate')
const modes: Mode[] = ['translate', 'rotate', 'scale']

type Space = 'world' | 'local'
const currentSpace = ref<Space>('world')
const spaces: Space[] = ['world', 'local']

//#region TresJS
const tresCanvasRef = shallowRef()
const renderCamRef = shallowRef()
const navCamRef = shallowRef()
const cameraHelperRef = shallowRef()
const canvasContainerRef = shallowRef()
const sceneNodeRefs = ref<{ [sceneNodeId: string]: Object3D }>({})

// Set cameras to manual during initialization. This runs only once as soon as refs are not null
const setCamerasManualWatcher = watchEffect(() => {
  if (renderCamRef.value != null && navCamRef.value != null) {
    renderCamRef.value.manual = false
    navCamRef.value.manual = false
    setCamerasManualWatcher()
  }
})

// When switching current camera set it in the tres context
watchEffect(() => {
  if (tresCanvasRef.value?.context != null && currentCamera.value != null) {
    const { setCameraActive } = tresCanvasRef.value.context
    setCameraActive(currentCamera.value)
  }
})

// when render cam is active, update manually what is required. CameraHelper has to be manually update when aspect/fov changes
watchEffect(() => {
  if (renderCamRef.value != null) {
    renderCamRef.value.aspect = state.value.sceneSettings.width / state.value.sceneSettings.height
    renderCamRef.value.fov = cameraNode.value?.properties?.fov ?? 40
    renderCamRef.value.updateProjectionMatrix()
  }
  if (cameraHelperRef.value != null) {
    cameraHelperRef.value.update()
  }
})

// when nav cam is active, update manually what is required
const canvasContainerSize = useElementSize(canvasContainerRef)
watchEffect(() => {
  if (navCamRef.value != null) {
    navCamRef.value.aspect = canvasContainerSize.width.value / canvasContainerSize.height.value
    navCamRef.value.updateProjectionMatrix()
  }
})

const transformControlFocused = ref(false)
const orbitEnabled = computed(() => !transformControlFocused.value && currentCameraName.value === 'nav')
//#endregion

function addConeSceneNode() {
  const newSceneNode: ConeSceneNode = {
    id: crypto.randomUUID(),
    type: 'cone',
    properties: {
      radius: 5,
      height: 10,
    },
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  }

  state.value.sceneNodes.push(newSceneNode)
  selectSceneNode(newSceneNode.id)
}

function addBoxSceneNode() {
  const newSceneNode: BoxSceneNode = {
    id: crypto.randomUUID(),
    type: 'box',
    properties: {
      width: 10,
      height: 10,
      length: 10,
    },
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  }

  state.value.sceneNodes.push(newSceneNode)
  selectSceneNode(newSceneNode.id)
}

function addSphereSceneNode() {
  const newSceneNode: SphereSceneNode = {
    id: crypto.randomUUID(),
    type: 'sphere',
    properties: {
      radius: 5,
    },
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  }

  state.value.sceneNodes.push(newSceneNode)
  selectSceneNode(newSceneNode.id)
}

function selectSceneNode(sceneNodeId: string) {
  selectedNodeId.value = sceneNodeId
}

function handleTransformChange(sceneNodeId: string, object: Object3D) {
  const sceneNode = state.value.sceneNodes.find(i => i.id === sceneNodeId)
  if (sceneNode != null) {
    sceneNode.position = [object.position.x, object.position.y, object.position.z]
    sceneNode.rotation = [object.rotation.x, object.rotation.y, object.rotation.z]
    sceneNode.scale = [object.scale.x, object.scale.y, object.scale.z]
  }
}

function handleDeleteSceneNode(sceneNodeId: string) {
  if (selectedNodeId.value === sceneNodeId) {
    selectedNodeId.value = null
  }
  state.value.sceneNodes.splice(
    state.value.sceneNodes.findIndex(i => i.id === sceneNodeId),
    1,
  )
}
</script>

<template>
  <div class="flex w-full inset-0 h-full light">
    <div class="flex flex-col gap-2 bg-gray-200 dark:bg-gray-800 p-2 min-w-[140px]">
      <div>
        Scene Explorer:
      </div>
      <div class="flex flex-col items-center justify-center gap-2">
        <button class="dark:bg-gray-600" @click="addConeSceneNode">
          Add Cone
        </button>

        <button class="dark:bg-gray-600" @click="addBoxSceneNode">
          Add Box
        </button>

        <button class="dark:bg-gray-600" @click="addSphereSceneNode">
          Add Sphere
        </button>
      </div>
      <div class="flex flex-col flex-grow gap-2">
        <div v-for="sceneNode in state.sceneNodes" :key="sceneNode.id" class="flex justify-between"
          :class="{ 'ring-2 ring-blue-400': sceneNode.id === selectedNodeId }">
          <div @click="selectSceneNode(sceneNode.id)">
            {{ sceneNode.type }}
          </div>
          <div v-if="sceneNode.type !== 'camera'" @click="handleDeleteSceneNode(sceneNode.id)">
            x
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col flex-grow">
      <div class="flex gap-2 border border-b-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-500 p-1">
        <div class="flex gap-1">
          <button v-for="mode in modes" :key="mode" class="dark:bg-gray-600"
            :class="{ 'ring-2 ring-blue-400': currentMode === mode }" @click="currentMode = mode">
            {{ mode }}
          </button>
        </div>
        |
        <div class="flex gap-1">
          <button class="dark:bg-gray-600" :disabled="!history.canUndo" @click="history.undo">
            Undo
          </button>
          <button class="dark:bg-gray-600" :disabled="!history.canRedo" @click="history.redo">
            Redo
          </button>
        </div>
        |
        <div class="flex gap-1">
          <button v-for="space in spaces" :key="space" class="dark:bg-gray-600"
            :class="{ 'ring-2 ring-blue-400': currentSpace === space }" @click="currentSpace = space">
            {{ space }}
          </button>
        </div>
        |
        <div class="flex gap-1">
          <button v-for="cameraName in ['render', 'nav']" :key="cameraName" class="dark:bg-gray-600"
            :class="{ 'ring-2 ring-blue-400': currentCameraName === cameraName }"
            @click="currentCameraName = cameraName">
            {{ cameraName }}
          </button>
        </div>
      </div>
      <div class="flex flex-grow items-center justify-center border border-slate-200 dark:border-gray-700">
        <SimpleEditorContainElement :enabled="currentCameraName === 'render'"
          :aspect-ratio="state.sceneSettings.width / state.sceneSettings.height" class="border border-slate-400">
          <div ref="canvasContainerRef" class="h-full w-full">
            <TresCanvas v-if="cameraNode != null" ref="tresCanvasRef" :clear-color="isDark ? '#252526' : '#FAFAFA'">
              <TresPerspectiveCamera :ref="(el) => {
                  renderCamRef = el;
                  sceneNodeRefs[cameraNode.id] = (el as unknown as Object3D);
                }
                " name="render" :position="cameraNode.position" :rotation="cameraNode.rotation" />
              <TresPerspectiveCamera ref="navCamRef" name="nav" :position="[50, 50, 50]" :far="3000" />

              <TresCameraHelper v-if="navCamRef != null && renderCamRef != null" ref="cameraHelperRef"
                :visible="currentCameraName === 'nav'" :args="[renderCamRef]" />

              <!-- TODO: couldn't get cientos orbit control to disable -->
              <SimpleEditorCustomTresOrbitControls :enabled="orbitEnabled" :camera="navCamRef" />

              <SimpleEditorSceneNodeCone v-for="sceneNode in state.sceneNodes.filter((i) => i.type === 'cone')"
                :key="sceneNode.id" :ref="(el: any) => {
                    sceneNodeRefs[sceneNode.id] = el?.mesh;
                  }
                  " :position="sceneNode.position" :rotation="sceneNode.rotation" :scale="sceneNode.scale"
                :properties="(sceneNode as ConeSceneNode).properties"
                :first="state.sceneNodes.filter(i => i.type === 'cone')[0] === sceneNode"
                @click="selectSceneNode(sceneNode.id)" />

              <SimpleEditorSceneNodeBox v-for="sceneNode in state.sceneNodes.filter((i) => i.type === 'box')"
                :key="sceneNode.id" :ref="(el: any) => {
                    sceneNodeRefs[sceneNode.id] = el?.mesh;
                  }
                  " :position="sceneNode.position" :rotation="sceneNode.rotation" :scale="sceneNode.scale"
                :properties="(sceneNode as BoxSceneNode).properties"
                :first="state.sceneNodes.filter(i => i.type === 'box')[0] === sceneNode"
                @click="selectSceneNode(sceneNode.id)" />

              <SimpleEditorSceneNodeSphere v-for="sceneNode in state.sceneNodes.filter((i) => i.type === 'sphere')"
                :key="sceneNode.id" :ref="(el: any) => {
                    sceneNodeRefs[sceneNode.id] = el?.mesh;
                  }
                  " :position="sceneNode.position" :rotation="sceneNode.rotation" :scale="sceneNode.scale"
                :properties="(sceneNode as SphereSceneNode).properties"
                :first="state.sceneNodes.filter(i => i.type === 'sphere')[0] === sceneNode"
                @click="selectSceneNode(sceneNode.id)" />

              <TransformControls v-if="selectedNodeId != null" :key="currentCameraName"
                :object="sceneNodeRefs[selectedNodeId!]" :mode="currentMode" :space="currentSpace" @mouse-down="
                  transformControlFocused = true;
                history.pause();
                " @mouse-up="
                  transformControlFocused = false;
                history.resume(true);
                " @object-change="handleTransformChange(selectedNodeId!, sceneNodeRefs[selectedNodeId!])" />
              <TresGridHelper :args="[100, 10, '#44403C', '#E4E4E7']" />
              <TheScreenshot />
            </TresCanvas>
          </div>
        </SimpleEditorContainElement>
      </div>
    </div>
    <div class="flex flex-col bg-gray-200 dark:bg-gray-800 p-2 gap-2">
      <div>
        <b>
          Scene Settings
        </b>
        <SimpleEditorSceneSettingsProps v-model="state.sceneSettings" />
      </div>
      <div v-if="selectedNode != null" class="flex flex-col gap-2 ">
        <b>
          Scene Node Properties
        </b>
        <SimpleEditorSceneNodeProps :model-value="selectedNode" @update:model-value="selectedNode!.position = $event.position;
        selectedNode!.rotation = $event.rotation;
        selectedNode!.scale = $event.scale" />
        <SimpleEditorSceneNodeCameraProps v-if="selectedNode.type === 'camera'" :model-value="selectedNode"
          @update:model-value="selectedNode!.properties = $event.properties" />
        <SimpleEditorSceneNodeConeProps v-if="selectedNode.type === 'cone'" :model-value="selectedNode"
          @update:model-value="selectedNode!.properties = $event.properties" />
        <SimpleEditorSceneNodeBoxProps v-if="selectedNode.type === 'box'" :model-value="selectedNode"
          @update:model-value="selectedNode!.properties = $event.properties" />
        <SimpleEditorSceneNodeSphereProps v-if="selectedNode.type === 'sphere'" :model-value="selectedNode"
          @update:model-value="selectedNode!.properties = $event.properties" />
      </div>
    </div>
  </div>
</template>