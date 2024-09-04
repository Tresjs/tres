import { reactive, toRefs } from 'vue'

const state = reactive({
  renderingTimes: 0,
})
export function useState() {
  return {
    ...toRefs(state),

  }
}
