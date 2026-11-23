<template>
  <WebGPUOnly>
    <div class="w-full h-screen relative">
      <TresCanvas clear-color="#82DBC5">
        <TresPerspectiveCamera :position="[3, 3, 3]" />
        <OrbitControls />
        <RoundedBox :args="[1, 1, 1, 4, 0.15]" :position="[-0.9, 0, 0]">
          <TresMeshStandardNodeMaterial color="#FBB03B" />
        </RoundedBox>
        <TorusKnot :args="[0.4, 0.15, 128, 32]" :position="[0.9, 0, 0]">
          <TresMeshStandardNodeMaterial color="#4F4F4F" :roughness="0.3" />
        </TorusKnot>
        <Grid
          :args="[10, 10]"
          :position="[0, -0.75, 0]"
          cell-color="#4f4f4f"
          section-color="#fbb03b"
          :fade-distance="25"
          :infinite-grid="true"
        />
        <TresAmbientLight :intensity="1" />
        <TresDirectionalLight :position="[2, 4, 3]" :intensity="2" />
      </TresCanvas>
    </div>
  </WebGPUOnly>
</template>
