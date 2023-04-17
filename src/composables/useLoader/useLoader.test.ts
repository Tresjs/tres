import { useLoader } from './'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

describe('useLoader', () => {
  test('is defined', () => {
    expect(useLoader).toBeDefined()
  })
  /* test('loads a glTF file using GLTFLoader and returns the result', async () => {
    const gltfUrl = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf'
    const { scene } = await useLoader(GLTFLoader, gltfUrl)
    expect(scene).toBeDefined()
  })

  test('applies extensions to the loader before loading', async () => {
    const gltfUrl = '/aku-aku/AkuAku.gltf'
    const extensions = (loader: GLTFLoader) => {
      loader.setPath('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf')
    }
    const { scene } = await useLoader(GLTFLoader, gltfUrl, extensions)

    expect(scene).toBeDefined()
  }) */
})

// TODO: find a way to test this
