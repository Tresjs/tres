<script setup lang="ts">
import { Box3, Camera, Color, Light, Mesh, MeshPhongMaterial, Quaternion, Vector3 } from 'three';
import { inject } from 'vue';
import { shaderToySrc } from '../fns/shaderToySrc';
import type { State } from '../index.vue';
import { shaderToyLights } from '../fns/shaderToyLights';

const state = inject('state') as State

const { scene } = await useGLTF('/models/shadertoy-museum/gallery.glb', { draco: true })

const material = new MeshPhongMaterial({ color: new Color('#000022') })

scene.traverse(obj => {
    if ('material' in obj) {
        obj.material = material
    }

    if (obj.name.startsWith('ShaderToy')) {
        const name = obj.userData.name as keyof typeof shaderToySrc
        const shader = shaderToySrc[name] as string
        const lightFn = shaderToyLights[name] ?? (() => { })
        const box = new Box3()
        box.setFromObject(obj)
        const size = new Vector3()
        box.getSize(size)

        if (!obj.userData.name) {
            throw ("Missing Blender property 'userData.name'.")
        }
        if (typeof obj.userData.name !== 'string') {
            throw ("Blender GLTF 'userData.name' should be a string.")
        }
        if (!(obj.userData.name in shaderToySrc)) {
            throw (`${obj.userData.name} not in shaderToySrc. Srcs: ${Object.keys(shaderToySrc).join(', ')}`)
        }

        const dimensions = new Vector3(1, 1, 0)
        dimensions.setFromMatrixPosition(obj.matrixWorld)
        dimensions.setFromMatrixScale(obj.matrixWorld)

        const scale = new Vector3(1, 1, 1)
        scale.setFromMatrixScale(obj.matrixWorld).multiplyScalar(2)
        scale.z = 0.001

        const position = new Vector3(0, 0, 0)
        position.setFromMatrixPosition(obj.matrixWorld)

        const rotation = new Quaternion(0, 0, 0)
        rotation.setFromRotationMatrix(obj.matrixWorld)

        dimensions.multiplyScalar(128)
        dimensions.x = Math.floor(dimensions.x)
        dimensions.y = Math.floor(dimensions.y)

        const shaderDataStr = (shader.split('/** SHADERDATA')[1] ?? '*/').split('*/')[0] ?? '{}'
        const shaderMetaData = (() => {
            let data = { title: '', author: '', description: '', href: 'https://www.shadertoy.com/' }
            try {
                data = { ...data, ...JSON.parse(shaderDataStr) }
            } catch (_) {
            }

            return data
        })()

        state.shaderToyTargets.push(
            {
                shader,
                ...shaderMetaData,
                lightFn,
                name: obj.name,
                dimensions,
                cameras: (obj.children.filter(c => 'isPerspectiveCamera' in c && c.isPerspectiveCamera) ?? []) as Camera[],
                lights: (obj.children.filter(c => 'isLight' in c && c.isLight) ?? []) as Light[],
                target: (obj.children.filter(c => c.name.startsWith('Target')))[0] as Mesh,
                floor: (obj.children.filter(c => c.name.startsWith('Floor')))[0] as Mesh,
            }
        )
    }
})

state.shaderToyTargets.sort((a, b) => (a.name).localeCompare(b.name))

for (const info of state.shaderToyTargets) {
    for (const light of info.lights) {
        light.getWorldPosition(light.position)
        light.removeFromParent()

        const userData = light.userData
        for (const key of Object.keys(userData)) {
            if ((typeof userData[key]) === 'string' && userData[key].startsWith('{')) {
                try {
                    if (key === 'x' || key === 'y' || key === 'z') {
                        const data = JSON.parse(userData[key])
                        data.init = light.position[key]
                        userData[key] = data
                    }
                    if (key === 'intensity') {
                        const data = JSON.parse(userData[key])
                        userData[key] = data
                    }
                } catch (e) {
                    console.error(e)
                }
            }
        }
    }

    for (const obj of [info.target, info.floor]) {
        obj.getWorldPosition(obj.position)
        obj.getWorldQuaternion(obj.quaternion)
        obj.getWorldScale(obj.scale)
        obj.removeFromParent()
    }
}

onMounted(
    () => setTimeout(() => {
        if (state.i < 0) {
            state.next()
        }
    }, 3000)
)
</script>

<template>
    <TresGroup>
        <primitive :object="scene" />
    </TresGroup>
</template>