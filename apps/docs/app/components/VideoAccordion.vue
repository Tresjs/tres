<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  videoId: string
  icon?: string
  startTime?: number
}>(), {
  icon: 'i-lucide-video',
  startTime: 0,
})
</script>

<template>
  <ProseCallout class="[&>div]:my-0 py-0">
    <UAccordion :items="[{ label: title, icon }]" :ui="{ }">
      <template #body>
        <ScriptYouTubePlayer :video-id="videoId" :player-vars="{ start: props.startTime }" class="group rounded-md overflow-hidden border border-default">
          <template #awaitingLoad>
            <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[48px] w-[68px] opacity-75 group-hover:opacity-100 transition-opacity">
              <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00" />
                <path d="M 45,24 27,14 27,34" fill="#fff" />
              </svg>
            </div>
          </template>
        </ScriptYouTubePlayer>
      </template>
    </UAccordion>
  </ProseCallout>
</template>
