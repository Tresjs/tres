<script setup lang="ts">
import { useFBO } from '.'
import type { FboOptions } from '.'

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
