<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { BufferGeometry, Camera, Material } from 'three'
import { useLoop } from '@tresjs/core'
import {
  BoxGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshNormalMaterial,
  PerspectiveCamera,
  SphereGeometry,
  TorusGeometry,
} from 'three'
import { onUnmounted, shallowRef } from 'vue'

const box = (() => {
  const box = new Mesh(
    new BoxGeometry(),
    new MeshBasicMaterial({
      color: 'red',
    }),
  )

  const childBox = new Mesh(
    new BoxGeometry(),
    new MeshBasicMaterial({
      color: 'red',
    }),
  )

  childBox.position.x = 1
  childBox.position.y = 1
  childBox.scale.set(0.3, 0.3, 0.3)

  box.add(childBox)
  return box
})()

const sphere = (() => {
  const sphere = new Mesh(
    new SphereGeometry(0.5),
    new MeshBasicMaterial({
      color: 'blue',
    }),
  )

  const childSphere = new Mesh(
    new SphereGeometry(),
    new MeshBasicMaterial({
      color: 'blue',
    }),
  )

  childSphere.position.x = 1
  childSphere.position.y = 1
  childSphere.scale.set(0.3, 0.3, 0.3)

  sphere.add(childSphere)

  return sphere
})()

const group = (() => {
  const group = new Group()
  const box0 = new Mesh(new BoxGeometry(), new MeshBasicMaterial({ color: 'red' }))
  const box1 = new Mesh(new BoxGeometry(), new MeshBasicMaterial({ color: 'blue' }))
  const box2 = new Mesh(new BoxGeometry(), new MeshBasicMaterial({ color: 'green' }))
  box1.position.x = 3
  box2.position.x = 6
  group.add(box0, box1, box2)
  return group
})()

const meshRef = shallowRef<Mesh>(box)
const primitiveX = shallowRef(0)
const primitiveY = shallowRef(0)
const tOrF = shallowRef(false)
const tOrFSlow = shallowRef(false)
const tOrFFast = shallowRef(false)
const elapsed = shallowRef(0)

const pool: {

  click: (...rest: unknown[]) => void
  pos: number[]
  group: Group
  mesh: Mesh
  meshBox: Mesh
  meshSphere: Mesh
  meshTorus: Mesh
  meshMoving: Mesh
  geo: BufferGeometry
  geoBox: BufferGeometry
  mat: Material
  matBas: Material
  cam: Camera
}[] = []
const COUNT = 10
for (let i = 0; i < COUNT; i++) {
  pool.push({
    click(...rest: unknown[]) {
      console.log(i, rest)
    },
    pos: [(i % 3) - 1, -Math.floor(i / 3) + 1, 0].map(v => v * 3),
    group: new Group(),
    mesh: new Mesh(),
    meshBox: (() => {
      const parent = new Mesh(new BoxGeometry(), new MeshNormalMaterial())
      const child = new Mesh(new BoxGeometry(), new MeshNormalMaterial())
      parent.add(child)
      child.position.set(1, 1, 1)
      child.scale.set(0.25, 0.25, 0.25)
      return parent
    })(),
    meshSphere: (() => {
      const parent = new Mesh(
        new SphereGeometry(0.5),
        new MeshNormalMaterial(),
      )
      const child = new Mesh(new SphereGeometry(0.5), new MeshNormalMaterial())
      parent.add(child)
      child.position.set(1, 1, 1)
      child.scale.set(0.25, 0.25, 0.25)
      return parent
    })(),
    meshTorus: (() => {
      const parent = new Mesh(new TorusGeometry(0.5, 0.15), new MeshNormalMaterial())
      const child = new Mesh(new TorusGeometry(0.5, 0.15), new MeshNormalMaterial())
      parent.add(child)
      child.position.set(1, 1, 1)
      child.scale.set(0.25, 0.25, 0.25)
      return parent
    })(),
    meshMoving: (() => {
      const parent = new Mesh(new BoxGeometry(), new MeshNormalMaterial())
      const child = new Mesh(new BoxGeometry(), new MeshNormalMaterial())
      parent.add(child)
      child.position.set(1, 1, 1)
      child.scale.set(0.25, 0.25, 0.25)
      return parent
    })(),
    geo: new SphereGeometry(0.5),
    geoBox: new BoxGeometry(),
    mat: new MeshNormalMaterial(),
    matBas: new MeshBasicMaterial({ color: 'red' }),
    cam: new PerspectiveCamera(),
  })
}

useLoop().onBeforeRender(({ elapsed: _elapsed }) => {
  meshRef.value = Math.floor(_elapsed) % 2 ? sphere : box
  sphere.scale.y = Math.sin(_elapsed)
  primitiveX.value = Math.sin(_elapsed)
  primitiveY.value = Math.cos(_elapsed)

  tOrF.value = !!(Math.floor(_elapsed) % 2)
  tOrFSlow.value = !!(Math.floor(_elapsed * 0.25) % 2)
  tOrFFast.value = !!(Math.floor(_elapsed * 2.5) % 2)
  for (const entry of pool) {
    entry.meshMoving.rotation.y = Math.sin(_elapsed)
  }
  elapsed.value = _elapsed
})

onUnmounted(() => {
  const dispose = (u: unknown) => {
    if (typeof u !== 'object' || u === null) {
      return
    }
    for (const val in Object.values(u)) {
      dispose(val)
    }
    if ('dispose' in u && typeof u.dispose === 'function') {
      u.dispose()
    }
  }

  for (const entry of pool) {
    dispose(entry)
  }
})
</script>

<template>
  <TresPerspectiveCamera :position="[0, 0, 30]" />

  <TresGroup :position="pool[0].pos">
    <primitive
      v-if="tOrF"
      :object="pool[0].group"
    >
      <primitive :object="pool[0].mesh" @click="pool[0].click">
        <primitive :object="pool[0].geo" />
        <TresMeshNormalMaterial />
        <TresMesh :position-y="1.5" :scale="-0.25">
          <TresMeshBasicMaterial color="black" />
          <TresConeGeometry />
        </TresMesh>
      </primitive>
    </primitive>
    <TresMesh :position-y="1.25" :scale="0.25">
      <TresMeshBasicMaterial color="white" />
      <TresConeGeometry />
    </TresMesh>
  </TresGroup>

  <primitive
    :object="pool[1].group"
    :position="pool[1].pos"
    @click="pool[1].click"
  >
    <primitive v-if="tOrF" :object="pool[1].mesh">
      <TresSphereGeometry :args="[0.5]" />
      <primitive :object="pool[1].mat" />
      <TresMesh :position-y="1.5" :scale="-0.25">
        <TresMeshBasicMaterial color="black" />
        <TresConeGeometry />
      </TresMesh>
    </primitive>
    <TresMesh :position-y="1.25" :scale="0.25">
      <TresMeshBasicMaterial color="white" />
      <TresConeGeometry />
    </TresMesh>
  </primitive>

  <primitive
    :object="pool[2].group"
    :position="pool[2].pos"
    @click="pool[2].click"
  >
    <TresMesh v-if="tOrF" :object="pool[2].mesh">
      <primitive :object="pool[2].geo" />
      <primitive :object="pool[2].mat" />
      <TresMesh :position-y="1.5" :scale="-0.25">
        <TresMeshBasicMaterial color="black" />
        <TresConeGeometry />
      </TresMesh>
    </TresMesh>
    <TresMesh :position-y="1.25" :scale="0.25">
      <TresMeshBasicMaterial color="white" />
      <TresConeGeometry />
    </TresMesh>
  </primitive>

  <primitive
    :object="pool[3].group"
    :position="pool[3].pos"
    @click="pool[3].click"
  >
    <primitive :object="tOrF ? pool[3].meshBox : pool[3].meshTorus" />
    <TresMesh :position-y="1.25" :scale="0.25">
      <TresMeshBasicMaterial color="white" />
      <TresConeGeometry />
      <TresMesh v-if="tOrF" :position-y="1.25" :scale="-1">
        <TresMeshBasicMaterial color="black" />
        <TresConeGeometry />
      </TresMesh>
    </TresMesh>
  </primitive>

  <primitive :object="pool[4].group">
    <primitive
      :position="pool[4].pos"
      :object="tOrF ? pool[4].meshBox : pool[4].meshTorus"
      :rotation-x="primitiveX"
      @click="pool[4].click"
    />
    <TresMesh v-if="tOrF" :position-y="1.5" :scale="-0.25">
      <TresMeshBasicMaterial color="black" />
      <TresConeGeometry />
    </TresMesh>
    <TresMesh :position-y="1.25" :scale="0.25">
      <TresMeshBasicMaterial color="white" />
      <TresConeGeometry />
    </TresMesh>
  </primitive>

  <primitive
    :object="pool[5].group"
    :position="pool[5].pos"
    @click="pool[5].click"
  >
    <primitive
      :object="tOrF ? pool[5].meshMoving : pool[5].meshTorus"
      :rotation-x="primitiveX"
    />
    <TresMesh v-if="tOrF" :position-y="1.5" :scale="-0.25">
      <TresMeshBasicMaterial color="black" />
      <TresConeGeometry />
    </TresMesh>
    <TresMesh :position-y="1.25" :scale="0.25">
      <TresMeshBasicMaterial color="white" />
      <TresConeGeometry />
    </TresMesh>
  </primitive>

  <primitive
    :object="pool[6].group"
    :position="pool[6].pos"
    @click="pool[6].click"
  >
    <primitive :object="pool[6].mesh">
      <primitive :object="tOrF ? pool[6].geo : pool[6].geoBox" />
      <primitive :object="pool[6].mat" />
      <TresMesh v-if="tOrF" :position-y="1.5" :scale="-0.25">
        <TresMeshBasicMaterial color="black" />
        <TresConeGeometry />
      </TresMesh>
    </primitive>
    <TresMesh :position-y="1.25" :scale="0.25">
      <TresMeshBasicMaterial color="white" />
      <TresConeGeometry />
    </TresMesh>
  </primitive>

  <primitive :object="pool[7].group" :position="pool[7].pos">
    <primitive
      :object="pool[7].mesh"
      @click="pool[7].click"
    >
      <primitive :object="pool[7].geo" />
      <primitive :object="tOrF ? pool[7].mat : pool[7].matBas" />
      <TresMesh v-if="tOrF" :position-y="1.5" :scale="-0.25">
        <TresMeshBasicMaterial color="black" />
        <TresConeGeometry />
      </TresMesh>
    </primitive>
    <TresMesh :position-y="1.25" :scale="0.25">
      <TresMeshBasicMaterial color="white" />
      <TresConeGeometry />
    </TresMesh>
  </primitive>

  <primitive
    :object="pool[8].group"
    :position="pool[8].pos"
    @click="pool[8].click"
  >
    <primitive :object="pool[8].mesh">
      <primitive :object="tOrFSlow ? pool[8].geo : pool[8].geoBox" />
      <primitive :object="tOrF ? pool[8].mat : pool[8].matBas" />
      <TresMesh v-if="tOrF" :position-y="1.5" :scale="-0.25">
        <TresMeshBasicMaterial color="black" />
        <TresConeGeometry />
      </TresMesh>
    </primitive>
    <TresMesh :position-y="1.25" :scale="0.25">
      <TresMeshBasicMaterial color="white" />
      <TresConeGeometry />
    </TresMesh>
  </primitive>

  <primitive :position="pool[9].pos" :object="!tOrF ? pool[9].meshTorus : group" @click="pool[9].click">
    <TresMesh :position-y="1.25" :scale="0.25">
      <TresMeshBasicMaterial color="white" />
      <TresConeGeometry />
    </TresMesh>
    <TresMesh v-if="tOrF" :position-y="1.5" :scale="-0.25">
      <TresMeshBasicMaterial color="black" />
      <TresConeGeometry />
    </TresMesh>
  </primitive>
</template>
