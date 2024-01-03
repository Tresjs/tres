<script setup lang="ts">
import type { SceneGraphObject } from '../types'

withDefaults(defineProps<{
  item: SceneGraphObject
  depth?: number
}>(), {
  depth: 0,
})

const isExpanded = ref(false)

function roundNumber(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}
</script>

<template>
  <div
    :class="{ 'text-sm text-gray-400 font-mono': depth > 0 }"
  >
    <div
      class="flex gap-2 items-end cursor-pointer pt2 mb2"
      @click="isExpanded = !isExpanded"
    >
      <span
        v-if="depth > 0"
        class="h-1 border-b border-gray-300 w-4"
      />
      <div class="flex gap-2 items-center -mb2.5">
        <Icon :name="item.icon" />
        <!-- <i :class="item.icon" /> -->{{ item.type }} <UBadge
          v-if="item.name "
          variant="soft"
        >
          {{ item.name }}
        </UBadge>
        <template v-if="item.type.includes('Light') && !isExpanded">
          <UBadge
            color="gray"
            variant="soft"
          > 
            <span
              class="w4 h4 rounded-full mr-2 border border-gray-200"
              :style="{ backgroundColor: `#${item.color}` }"
            />
            #{{ item.color }}
          </UBadge>
          <UBadge
            color="green"
            variant="soft"
          > 
            {{ item.intensity }}
          </UBadge>
        </template>
        <template v-if="item.type.includes('Camera') && !isExpanded">
          <UTooltip
            text="X"
          >
            <UBadge
              color="gray"
              variant="soft"
            >
              {{ roundNumber(item.position.x) }}
            </UBadge>
          </UTooltip>
          <UTooltip
            text="Y"
          >
            <UBadge
              color="gray"
              variant="soft"
            >
              {{ roundNumber(item.position.y) }}
            </UBadge>
          </UTooltip>
          <UTooltip
            text="Z"
          >
            <UBadge
              color="gray"
              variant="soft"
            >
              {{ roundNumber(item.position.z) }}
            </UBadge>
          </UTooltip>
        </template>
      </div>
    </div>
    <div
      v-if="isExpanded || depth === 0"
      :class="{ 'border-l border-gray-300': item.children.length > 0, 'ml2.5': depth === 0, 'ml6.5': depth > 0 }"
    >
      <template v-if="item.children.length > 0">
        <SceneGraphItem
          v-for="(child, index) in item.children"
          :key="index"
          :depth="depth + 1"
          :item="child"
        />
      </template>
      <template v-else>
        <div class="p4 text-gray-400 text-xs font-mono">
          <div
            v-if="item.geometry"
            class="mb-2 flex items-center gap-2"
          >
            <strong>Geometry</strong>
            <UBadge
              color="gray"
              variant="soft"
            >
              <i class="i-iconoir-box-3d-three-points mr2" />
              <a
                :href="`https://threejs.org/docs/#api/en/geometries/${item.geometry.type}`"
                target="_blank"
              >
                {{ item.geometry.type.replace('Geometry', '') }}
              </a> 
            </UBadge>
          </div>
          <div
            v-if="item.material"
            class="mb-2 flex items-center gap-2"
          >
            <strong>Material</strong>
   
            <UBadge
              color="gray"
              variant="soft"
            > 
              <i class="i-iconoir-select-face-3d mr2" />
              <a
                :href="`https://threejs.org/docs/#api/en/materials/${item.material.type}`"
                target="_blank"
              >
                {{ item.material?.type.replace('Material', '') }}
              </a> 
            </UBadge>

            <UBadge
              color="gray"
              variant="soft"
            > 
              <span
                class="w4 h4 rounded-full mr-2 border border-gray-200"
                :style="{ backgroundColor: `#${item.material.color.getHexString()}` }"
              />
              #{{ item.material.color.getHexString() }}
            </UBadge>
          </div>
          <div
            v-if="item.color"
            class="mb-2 flex items-center gap-2"
          >
            <strong>Color</strong>
            <UTooltip
              text="Color"
            >
              <UBadge
                color="gray"
                variant="soft"
              > 
                <span
                  class="w4 h4 rounded-full mr-2 border border-gray-200"
                  :style="{ backgroundColor: `#${item.color}` }"
                />
                #{{ item.color }}
              </UBadge>
            </UTooltip>
          </div>
          <div
            v-if="item.color"
            class="mb-2 flex items-center gap-2"
          >
            <strong>Intensity</strong>
            <UTooltip
              text="Intensity"
            >
              <UBadge
                color="gray"
                variant="soft"
              > 
                {{ item.intensity }}
              </UBadge>
            </UTooltip>
          </div>
          <div class="flex items-center mb2 gap-2">
            <UTooltip
              text="Position"
            >
              <i
                class="i-iconoir-axes mr1"
              />
            </UTooltip>
            
            <UTooltip
              text="X"
            >
              <UBadge
                color="gray"
                variant="soft"
              >
                {{ roundNumber(item.position.x) }}
              </UBadge>
            </UTooltip>
            <UTooltip
              text="Y"
            >
              <UBadge
                color="gray"
                variant="soft"
              >
                {{ roundNumber(item.position.y) }}
              </UBadge>
            </UTooltip>
            <UTooltip
              text="Z"
            >
              <UBadge
                color="gray"
                variant="soft"
              >
                {{ roundNumber(item.position.z) }}
              </UBadge>
            </UTooltip>
          </div>
          <div class="flex items-center mb2 gap-2">
            <UTooltip
              text="Rotation"
            >
              <i class="i-carbon-rotate-clockwise mr-1" />
            </UTooltip>
            
            <UTooltip
              text="X"
            >
              <UBadge
                color="gray"
                variant="soft"
              >
                {{ roundNumber(item.rotation.x) }}
              </UBadge>
            </UTooltip>
            <UTooltip
              text="Y"
            >
              <UBadge
                color="gray"
                variant="soft"
              >
                {{ roundNumber(item.rotation.y) }}
              </UBadge>
            </UTooltip>
            <UTooltip
              text="Z"
            >
              <UBadge
                color="gray"
                variant="soft"
              >
                {{ roundNumber(item.rotation.z) }}
              </UBadge>
            </UTooltip>
          </div>
          <div
            v-if="item.scale"
            class="flex items-center mb2 gap-2"
          >
            <UTooltip
              text="Scale"
            >
              <i class="i-iconoir-ellipse-3d-three-points mr-1" />
            </UTooltip>
            
            <UTooltip
              text="X"
            >
              <UBadge
                color="gray"
                variant="soft"
              >
                {{ roundNumber(item.scale?.x) }}
              </UBadge>
            </UTooltip>
            <UTooltip
              text="Y"
            >
              <UBadge
                color="gray"
                variant="soft"
              >
                {{ roundNumber(item.scale?.y) }}
              </UBadge>
            </UTooltip>
            <UTooltip
              text="Z"
            >
              <UBadge
                color="gray"
                variant="soft"
              >
                {{ roundNumber(item.scale?.z) }}
              </UBadge>
            </UTooltip>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>