<template>
  <div class="overlay-info">
    <slot></slot>
  </div>
</template>

<style scoped>
.overlay-info {
  position: fixed;
  top: 0;
  left: 0;
  margin: 10px;
  padding: 16px;
  max-width: 400px;
  z-index: 1000;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    'Noto Sans',
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji';
  font-size: small;
  background-color: white;
  border-radius: 6px;
  overflow: auto;
}
</style>
