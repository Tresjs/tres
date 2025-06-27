<script setup lang="ts">
import { data } from './contribution.data.js'

import { onMounted, ref } from 'vue'

const content = ref('')

onMounted(async () => {
  content.value = data
})
</script>

<div v-html="content" class="remote-markdown"></div>
