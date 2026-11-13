<script setup lang="ts">
import { useFBO } from './useFBO.webgpu'
import type { FboOptions } from './useFBO.webgpu'

const props = withDefaults(defineProps<FboOptions>(), {
  depth: false,
  settings: undefined,
  autoRender: true,
})

const target = useFBO(props)

defineExpose({
  instance: target,
})
</script>
