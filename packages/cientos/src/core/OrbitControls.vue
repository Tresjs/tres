<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { Camera, WebGLRenderer } from 'three'
import { OrbitControls as OrbitControlsImp } from 'three-stdlib'
import { inject, type Ref, unref, watch } from 'vue'

let controls: OrbitControlsImp

const camera = inject<Ref<Camera>>('camera')
const renderer = inject<Ref<WebGLRenderer>>('renderer')
watch(
  [camera, renderer],
  () => {
    if (camera?.value && renderer?.value) {
      controls = new OrbitControlsImp(camera.value, unref(renderer).domElement)
      controls.enableDamping = true

      const { onLoop } = useRenderLoop()

      onLoop(() => {
        if (controls) {
          controls.update()
        }
      })
    }
  },
  {
    deep: true,
  },
)
</script>
