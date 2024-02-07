<script setup lang="ts">

</script>

<template>
  <div>
    <header class="menu">
      <div>
        <NuxtLink to="/">
          Home
        </NuxtLink>
      </div>
      <div>
        <NuxtLink
          to="/page1"
          :prefetch="false"
        >
          page1
        </NuxtLink>
      </div>
      <div>
        <a href="/page2">
          page2
        </a>
      </div>
    </header>
    <slot />
  </div>
</template> 

<style>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
}
</style>