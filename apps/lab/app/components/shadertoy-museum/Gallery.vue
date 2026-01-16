<script setup lang="ts">
import type { Camera, Light } from 'three';
import { Box3, Mesh, MeshPhongMaterial, Quaternion, Vector3 } from 'three'
import { shaderToySrc } from './shader-toy'
import { shaderToyLights } from './shader-toy/lights'
import type { ShaderToyMuseumState, ShaderToyTarget } from './const'

const state: ShaderToyMuseumState = inject('state')!

const { state: gallery } = useGLTF('/models/shadertoy-museum/gallery.glb', { draco: true })

watch(gallery, (newGallery) => {
  if (newGallery) {
    const phongMaterial = new MeshPhongMaterial({ color: '#000022' })
    newGallery.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = phongMaterial
      }

      if (child.name.startsWith('ShaderToy')) {
        if (!child.userData.name) {
          throw ("Missing Blender property 'userData.name'.")
        }
        if (typeof child.userData.name !== 'string') {
          throw ("Blender GLTF 'userData.name' should be a string.")
        }
        if (!(child.userData.name in shaderToySrc)) {
          throw (`${child.userData.name} not in shaderToySrc. Srcs: ${Object.keys(shaderToySrc).join(', ')}`)
        }

        const name = child.userData.name as keyof typeof shaderToySrc
        const shader = shaderToySrc[name as keyof typeof shaderToySrc]
        const lightFn = shaderToyLights[name as keyof typeof shaderToyLights]
        const cameras = child.children.filter(c => 'isPerspectiveCamera' in c && c.isPerspectiveCamera) as Camera[]
        const lights = child.children.filter(c => 'isLight' in c && c.isLight) as Light[]
        const target = child.children.filter(c => c.name.startsWith('Target'))[0] as Mesh
        const floor = child.children.filter(c => c.name.startsWith('Floor'))[0] as Mesh

        const box = new Box3()
        box.setFromObject(child)
        const size = new Vector3()
        box.getSize(size)
        const dimensions = new Vector3(1, 1, 0)
        dimensions.setFromMatrixPosition(child.matrixWorld)
        dimensions.setFromMatrixScale(child.matrixWorld)

        const scale = new Vector3(1, 1, 1)
        scale.setFromMatrixScale(child.matrixWorld).multiplyScalar(2)
        scale.z = 0.001

        const position = new Vector3(0, 0, 0)
        position.setFromMatrixPosition(child.matrixWorld)

        const rotation = new Quaternion(0, 0, 0)
        rotation.setFromRotationMatrix(child.matrixWorld)

        dimensions.multiplyScalar(128)
        dimensions.x = Math.floor(dimensions.x)
        dimensions.y = Math.floor(dimensions.y)

        const shaderDataStr = (shader.split('/** SHADERDATA')[1] ?? '*/').split('*/')[0] ?? '{}'
        const shaderMetaData = (() => {
          let data = { title: '', author: '', description: '', href: 'https://www.shadertoy.com/' }
          try {
            data = { ...data, ...JSON.parse(shaderDataStr) }
          } catch (error) {
            console.error(error)
          }

          return data
        })()

        state.shaderToyTargets.push({
          shader,
          ...shaderMetaData,
          lightFn,
          name: child.name,
          dimensions,
          cameras,
          lights,
          target,
          floor,
        })
      }
    })
    state.shaderToyTargets.sort((a: ShaderToyTarget, b: ShaderToyTarget) => (a.name).localeCompare(b.name))

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
  }
})
</script>
<template>
  <TresGroup>
    <primitive v-if="gallery" :object="gallery.scene" />
  </TresGroup>
</template>