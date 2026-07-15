<template>
  <Suspense>
    <EffectComposerPmndrs>
      <BloomPmndrs :radius="0.85" :intensity="0.4" :luminance-threshold="0.1" :luminance-smoothing="0.3" mipmap-blur />
    </EffectComposerPmndrs>
  </Suspense>
</template>