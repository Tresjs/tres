<script setup lang="ts">
import { VPHomeSponsors } from 'vitepress/theme'

/* const { data } = useSponsor() */
</script>

<template>
  <VPHomeSponsors
    message="TresJS is free and open source, made possible by wonderful sponsors."
    :data="[]"
  />
  <div class="action">
    <a
      class="sponsor"
      href="https://github.com/sponsors/tresjs"
      target="_blank"
      rel="noreferrer"
    >
      Become a sponsor
    </a>
  </div>
  <div class="action">
    <p class="message">Consider supporting our friends</p>
  </div>
  <ul class="action flex">
    <li>
      <a
        class="sponsor"
        href="https://github.com/sponsors/vitejs"
        target="_blank"
        rel="noreferrer"
      >
        Vite <i class="i-logos-vitejs ml-2"></i>
      </a>
    </li>
    <li>
      <a
        class="sponsor"
        href="https://github.com/sponsors/patak-dev"
        target="_blank"
        rel="noreferrer"
      >
        Patak <img class="w-5 h-5 rounded ml-2" src="https://avatars.githubusercontent.com/u/583075?v=4" alt="" />
      </a>
    </li>
    <li>
      <a
        class="sponsor"
        href="https://github.com/sponsors/antfu"
        target="_blank"
        rel="noreferrer"
      >
        Anthony Fu <img class="w-5 h-5 rounded ml-2" src="https://avatars.githubusercontent.com/u/11247099?v=4" alt="" />
      </a>
    </li>
    <li>
      <a
        class="sponsor"
        href="https://github.com/sponsors/posva"
        target="_blank"
        rel="noreferrer"
      >
        posva <img class="w-5 h-5 rounded ml-2" src="https://avatars.githubusercontent.com/u/664177?v=4" alt="" />
      </a>
    </li>
    <li>
      <a
        class="sponsor"
        href="https://github.com/sponsors/johnsoncodehk"
        target="_blank"
        rel="noreferrer"
      >
        Johnson Chu <img class="w-5 h-5 rounded ml-2" src="https://avatars.githubusercontent.com/u/16279759?v=4" alt="" />
      </a>
    </li>
    <li>
      <a
        class="sponsor"
        href="https://github.com/sponsors/CodyJasonBennett"
        target="_blank"
        rel="noreferrer"
      >
        Cody Bennet <img class="w-5 h-5 rounded ml-2" src="https://avatars.githubusercontent.com/u/23324155?v=4" alt="" />
      </a>
    </li>
    <li>
      <a
        class="sponsor"
        href="https://github.com/sponsors/nuxt"
        target="_blank"
        rel="noreferrer"
      >
        Daniel Roe <img class="w-5 h-5 rounded ml-2" src="https://avatars.githubusercontent.com/u/23360933?s=160&v=4" alt="" />
      </a>
    </li>
    <li>
      <a
        class="sponsor"
        href="https://github.com/sponsors/danielroe"
        target="_blank"
        rel="noreferrer"
      >
        Nuxt <img class="w-5 h-5 rounded ml-2" src="https://avatars.githubusercontent.com/u/28706372?v=4" alt="" />
      </a>
    </li>
  </ul>
</template>

<style scoped>
.action {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding-top: 4rem;
}

.sponsor {
  /* .VPButton */
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s;
  /* .VPButton.medium */
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  /* .VPButton.sponsor */
  border-color: var(--vp-button-sponsor-border);
  color: var(--vp-button-sponsor-text);
  background-color: var(--vp-button-sponsor-bg);
}

.sponsor:hover {
  /* .VPButton.sponsor:hover */
  border-color: var(--vp-button-sponsor-hover-border);
  color: var(--vp-button-sponsor-hover-text);
  background-color: var(--vp-button-sponsor-hover-bg);
}
</style>
