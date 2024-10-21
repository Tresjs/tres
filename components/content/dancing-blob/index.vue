<!-- Github Luckystriike: https://github.com/luckystriike22/TresJsPlayground/ -->
<script lang="ts" setup>
const analyser = shallowRef()
const audioStream = shallowRef()
const dataArray = shallowRef()
const showInfoDialog = shallowRef(false)

// lifecycle
onMounted(async () => {
  await nextTick()

  try {
    const access = await navigator.permissions.query({ name: 'microphone' })
    showInfoDialog.value = access.state != 'granted'

    audioStream.value = await navigator.mediaDevices.getUserMedia({ audio: true })
    showInfoDialog.value = false
    handleMicrophoneAccess()

  }
  catch (error) {
    showInfoDialog.value = true
    alert('Not able to accessing microphone')
  }
})

// handle the microphone connection
const handleMicrophoneAccess = () => {
  const audioContext = new (window.AudioContext)()
  const source = audioContext.createMediaStreamSource(audioStream.value)

  analyser.value = audioContext.createAnalyser()
  analyser.value.fftSize = 2048
  source.connect(analyser.value)

  const bufferLength = analyser.value.frequencyBinCount
  dataArray.value = new Uint8Array(bufferLength)
}
</script>

<template>
  <button
    class="gitBtn bg-gray-600 hover:bg-gray-700 opacity-40 transition-color shadow-lg hover:shadow-xl infline-flex w-12 h-12 justify-center items-center rounded-full absolute bottom-2 right-2"
  >
    <a
      href="https://github.com/Tresjs/lab/tree/main/components/content/dancing-blob"
      target="_blank"
    >Code</a>
  </button>

  <TresCanvas
    v-show="!showInfoDialog"
    clear-color="#0c1a30"
  >
    <TheDancingBlob
      :analyser="analyser"
      :data-array="dataArray"
    />
  </TresCanvas>
  <span
    v-if="showInfoDialog"
    class="blobPermissionDialog justify-center items-center infline-flex absolute"
  >
    <p>
      Hey! <br>
      This site requires microphone permissions. The
      microphone is only used to calculate the frequency necessary for the blob to dance. A browser pop-up will ask you
      for permission.
    </p>
  </span>
</template>

<style scoped>
.gitBtn {
  margin-bottom: 10px;
  margin-right: 10px;
  z-index: 10;
  color: white;
}

.blobPermissionDialog {
  height: 100vh;
  justify-content: center;
  display: flex;
  background-color: #0c1a30;
  width: 100vw;
  color: white;
  font-size: x-large;
}

.blobPermissionDialog p {
  width: 700px;
}
</style>