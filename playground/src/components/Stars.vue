<script setup lang="ts">
import { Stars } from '@cientos'
import { shallowRef, watch } from 'vue'

const star = shallowRef<Stars>(null)

watch(star, value => {
    console.log(value)
})
</script>
<template>
    <Stars ref="star" :radius="1" />
</template>