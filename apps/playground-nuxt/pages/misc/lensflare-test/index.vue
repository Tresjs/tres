<script setup lang="ts">
import { Lensflare } from '@tresjs/cientos'
const uuid = 'lensflare-test'
const [x, z] = [shallowRef(0), shallowRef(0)]

const { scale, seed, color, distance } = useControls({
    scale: { value: 0.33, min: 0.01, max: 2, step: 0.01 },
    seed: { value: 1028, min: 1, max: 5000, step: 1 },
    color: '#ffffff',
    distance: { value: 0, min: -2, max: 2, step: 0.1 },
}, { uuid })

function onLoop({ elapsed }: { elapsed: number }) {
    z.value = Math.cos(elapsed * 0.5) * 2
    x.value = Math.sin(elapsed)
}
</script>

<template>
    <TresLeches :uuid="uuid" />
    <TresCanvas clear-color="#333" @loop="onLoop">
        <OrbitControls />
        <TresPointLight :position="[x, 0, z]">
            <Lensflare :seed="seed" :scale="scale" :color="color" :distance="distance" />
        </TresPointLight>
        <Torus v-for="n in [-2, 0, 2]" :key="n" :args="[0.7, 0.15]" :position-z="n" :rotation-y="Math.PI * 0.5">
            <TresMeshPhongMaterial color="#888" />
        </Torus>
        <TresGridHelper :position="[0, -0.9, 0]" />
    </TresCanvas>
</template>
