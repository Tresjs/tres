<template>
  <ClientOnly>
    <div
      class="relative my-8 flex flex-col rounded-lg overflow-hidden shadow-lg"
    >
      <Suspense>
        <slot></slot>
      </Suspense>
    </div>
  </ClientOnly>
</template>
