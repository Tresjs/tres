<script setup lang="ts">
import { Clouds } from '@cientos'

</script>

<template>
    <Clouds :position="[-4, -2, 0]" :segments="8" />
    <Clouds :position="[-4, 2, 0]" :segments="8" />
    <Clouds :segments="8" />
    <Clouds :position="[4, -2, 0]" :segments="8" />
    <Clouds :position="[4, 2, 0]" :segments="8" />
</template>
