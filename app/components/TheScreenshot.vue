<script setup lang="ts">
import { Vector2 } from 'three'

const { renderer, scene, camera } = useTres()

function takeScreenshot() {
  const route = useRoute()
  const experimentName = route.params.slug?.[1] || 'unknown'
  
  if (!camera.value) return
  
  // Store original size
  const originalSize = renderer.getSize(new Vector2())
  const originalPixelRatio = renderer.getPixelRatio()
  
  // Set OG image dimensions (1200x630)
  const ogWidth = 1200
  const ogHeight = 630
  
  // Update renderer size and pixel ratio for high quality
  renderer.setSize(ogWidth, ogHeight)
  renderer.setPixelRatio(1)
  
  // Update camera aspect ratio
  const originalAspect = camera.value.aspect
  camera.value.aspect = ogWidth / ogHeight
  camera.value.updateProjectionMatrix()
  
  // Render at OG resolution
  renderer.render(scene.value, camera.value)
  const dataUrl = renderer.domElement.toDataURL('image/png')
  
  // Restore original settings
  renderer.setSize(originalSize.x, originalSize.y)
  renderer.setPixelRatio(originalPixelRatio)
  camera.value.aspect = originalAspect
  camera.value.updateProjectionMatrix()
  
  // Download
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = `${experimentName}.png`
  link.click()
}

defineShortcuts({
  s: () => {
    takeScreenshot()
  }
})
</script>
