<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import type { CubeTexture, Texture } from 'three'
import type { EnvironmentOptions } from './const'

import { useEnvironment } from '.'

const props = withDefaults(defineProps<EnvironmentOptions>(), {
  background: false,
  blur: 0,
  files: [],
  path: '',
  preset: undefined,
})

const texture: Ref<Texture | CubeTexture | null> = ref(null)
defineExpose(texture)

texture.value = await useEnvironment(props).texture
</script>
