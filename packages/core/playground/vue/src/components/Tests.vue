<script setup lang="ts">
const props = withDefaults(defineProps<{
  tests: { getPass: () => boolean, msg: string }[]
}>(), {
  tests: () => [],
})

const tests = shallowRef<{ isPass: boolean, msg: string }[]>([])
watch(() => [props.tests], run, { immediate: true })

function run() {
  tests.value = []
  for (const { getPass, msg } of props.tests) {
    tests.value.push({ isPass: getPass(), msg })
  }
}

defineExpose({
  run,
})
</script>

<template>
  <div>
    <ul>
      <li v-for="test, i of tests" :key="i">
        <TestResult :is-pass="test.isPass" :msg="test.msg" />
      </li>
    </ul>
  </div>
</template>
