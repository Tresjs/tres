<script lang="ts" setup>
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { useEffect } from './composables/useEffect'

const { pass } = useEffect(() => new OutputPass())

defineExpose({ pass })
</script>
