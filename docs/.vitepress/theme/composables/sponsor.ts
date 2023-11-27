import { ref, onMounted } from 'vue'

const data = ref()

export function useSponsor() {
  onMounted(async () => {
    if (data.value) {
      return
    }
    /* 
    const result = await fetch(dataUrl)
    const json = await result.json() */

    data.value = []
  })

  return {
    data,
  }
}