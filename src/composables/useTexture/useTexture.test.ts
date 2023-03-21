import { LoadingManager, Texture, TextureLoader } from 'three'
import { useTexture } from '.'

describe('useTexture', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  // TODO: Add tests, maybe mock the texture loader?
  it.todo('should load a single texture', async () => {
    const loadingManager = new LoadingManager()
    const textureLoader = new TextureLoader(loadingManager)

    const spy = vi.spyOn(textureLoader, 'load').mockImplementation(() => {})
    const texture = await useTexture([
      'https://github.com/Tresjs/assets/blob/main/textures/stylized-grass/stylized-grass1_albedo.png?raw=true',
    ])
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
