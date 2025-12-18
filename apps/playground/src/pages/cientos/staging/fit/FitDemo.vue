<script setup lang="ts">
import { Fit, OrbitControls } from '@tresjs/cientos'
import { useLoop,
} from '@tresjs/core'
import { Vector3 } from 'three'
import type { TresObject3D } from '@tresjs/core'
import RandUtils from '../../../../../../src/core/abstractions/Lensflare/RandUtils'

defineProps<{
  choice: Ref<TresObject3D>
  object: Ref<TresObject3D>
}>()
function getPositions(seed: number, count = 40, radius = 10) {
  // NOTE: Generate some randomish positions for
  // some child components of `<Fit />`
  const positions: Vector3[] = []
  const rng = new RandUtils(seed)
  const rand = () => rng.rand()
  const offsetX = rand() * 10
  const offsetY = rand() * 10
  const offsetZ = rand() * 10
  const radX = rand() * radius + 1
  const radY = rand() * radius + 1
  const radZ = rand() * radius + 1
  for (let i = 0; i < count; i++) {
    positions.push(
      new Vector3(
        rand() * radX + offsetX,
        rand() * radY + offsetY,
        rand() * radZ + offsetZ,
      ),
    )
  }
  return positions
}

// NOTE: Create some refs so we can scale, rotate, and twist
// the container and `<Fit />` elements. We want to make sure
// that it works in chains with the usual transforms.
const [sx0, sy0, sz0, rx0, ry0, rz0, x0, y0, z0, sx1, sy1, sz1, rx1, ry1, rz1, x1, y1, z1, sx2, sy2, sz2, rx2, ry2, rz2, x2, y2, z2, x3, y3] = Array.from({ length: 30 })
  .fill(0)
  .map(_ => shallowRef(0))
const fit0 = shallowRef({ fit: () => {} })
const fit1 = shallowRef({ fit: () => {} })
const fit2 = shallowRef({ fit: () => {} })
const { sin, cos, PI } = Math

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  rx0.value = sin(elapsed * 0.05) * PI
  ry0.value = sin(elapsed * 0.11) * PI
  rz0.value = sin(elapsed * 0.22) * PI
  rx1.value = sin(elapsed * 0.66) * PI
  ry1.value = sin(elapsed * 0.77) * PI
  rz1.value = sin(elapsed * 0.88) * PI
  rx2.value = sin(elapsed * 1.33) * PI
  ry2.value = sin(elapsed * 1.44) * PI
  rz2.value = sin(elapsed * 1.55) * PI

  x0.value = sin(elapsed * 0.33)
  y0.value = sin(elapsed * 0.44)
  z0.value = sin(elapsed * 0.55)
  x1.value = sin(elapsed * 0.99)
  y1.value = sin(elapsed * 1.11)
  z1.value = sin(elapsed * 1.22)
  x2.value = sin(elapsed * 1.66)
  y2.value = sin(elapsed * 1.77)
  z2.value = sin(elapsed * 1.88)

  x3.value = sin(elapsed)
  y3.value = cos(elapsed)

  sx0.value = cos(elapsed * 0.22)
  sy0.value = cos(elapsed * 0.33)
  sz0.value = cos(elapsed * 0.33)
  sx1.value = cos(elapsed * 0.22)
  sy1.value = cos(elapsed * 0.44)
  sz1.value = cos(elapsed * 0.55)
  sx2.value = cos(elapsed * 0.66)
  sy2.value = cos(elapsed * 0.77)
  sz2.value = cos(elapsed * 0.88)

  fit0.value.update()
  fit1.value.update()
  fit2.value.update()
})
</script>

<template>
  <TresPerspectiveCamera :position="[5, 5, 5]" />
  <TresGroup
    :rotation="[rx0, ry0, rz0]"
    :position="[x0, y0, z0]"
    :scale="[sx0, sy0, sz0]"
  >
    <TresGroup
      :rotation="[rx1, ry1, rz1]"
      :position="[x1, y1, z1]"
      :scale="[sx1, sy1, sz1]"
    >
      <TresGroup
        :rotation="[-1, 0, 0]"
        :visible="choice.value === object"
      >
        <primitive :object="object" />
      </TresGroup>
      <TresGroup
        :rotation="[rx2, ry2, rz2]"
        :position="[x2, y2, z2]"
        :scale="[sx2, sy2, sz2]"
      >
        <Fit
          ref="fit0"
          :into="choice.value"
        >
          <TresMesh
            v-for="(p, ii) of getPositions(0)"
            :key="ii"
            :position="p"
          >
            <TresBoxGeometry />
            <TresMeshBasicMaterial color="red" />
          </TresMesh>
        </Fit>
      </TresGroup>
    </TresGroup>
  </TresGroup>
  <Fit
    ref="fit1"
    :into="choice.value"
  >
    <TresMesh :position="[x3, y3, 3]">
      <TresTorusGeometry />
      <TresMeshBasicMaterial color="blue" />
    </TresMesh>
    <TresMesh :position="[x3, y3, 0]">
      <TresTorusGeometry />
      <TresMeshBasicMaterial color="blue" />
    </TresMesh>
    <TresMesh :position="[x3, y3, -3]">
      <TresTorusGeometry />
      <TresMeshBasicMaterial color="blue" />
    </TresMesh>
  </Fit>
  <Fit
    ref="fit2"
    :into="choice.value"
  >
    <TresMesh :position="[0, 0, -5]">
      <TresSphereGeometry />
      <TresMeshBasicMaterial color="green" />
    </TresMesh>
  </Fit>
  <OrbitControls />
  <TresGridHelper />
</template>
