<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  abstractionsRoutes,
  controlsRoutes,
  stagingRoutes,
  loadersRoutes,
  materialsRoutes,
  directivesRoutes,
} from '../router/routes'

const router = useRouter()
</script>

<template>
  <section>
    <h1 style="text-align: center;">
      Playground links
    </h1>
    <div class="flex justify-between flex-wrap">
      <div class="section">
        <h2> Abstractions </h2>
        <div
          v-for="route in abstractionsRoutes"
          :key="route.name"
          class="link-wrapper"
        >
          <router-link :to="route.path">
            <span class="link-demos">{{ route.name }} </span>
          </router-link>
        </div>
      </div>
      <div class="section">
        <h2> Controls </h2>
        <div
          v-for="route in controlsRoutes"
          :key="route.name"
          class="link-wrapper"
        >
          <router-link :to="route.path">
            <span class="link-demos">{{ route.name }} </span>
          </router-link>
        </div>
      </div>
      <div class="section">
        <h2> Staging </h2>
        <div
          v-for="route in stagingRoutes"
          :key="route.name"
          class="link-wrapper"
        >
          <router-link :to="route.path">
            <span class="link-demos">{{ route.name }} </span>
          </router-link>
        </div>
      </div>
      <div class="section">
        <h2> Loaders </h2>
        <div
          v-for="route in loadersRoutes"
          :key="route.name"
          class="link-wrapper"
        >
          <router-link :to="route.path">
            <span class="link-demos">{{ route.name }} </span>
          </router-link>
        </div>
      </div>
      <div class="section">
        <h2> Materials </h2>
        <div
          v-for="route in materialsRoutes"
          :key="route.name"
          class="link-wrapper"
        >
          <router-link :to="route.path">
            <span class="link-demos">{{ route.name }} </span>
          </router-link>
        </div>
      </div>
      <div class="section">
        <h2> Directives </h2>
        <div
          v-for="route in directivesRoutes"
          :key="route.name"
          class="link-wrapper"
        >
          <router-link :to="route.path">
            <span class="link-demos">{{ route.name }} </span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.debug{
  border: 1px solid red;
}
section{
  min-width: 100%;
  min-height: 100%;
  background-color: #f7f7f7 !important;
}
.section{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #111;
  border-radius: 0.5rem;
  background-color: #ccc;
}
.unordered-list{
  list-style-type: none;
  padding: 0;
  margin: 0;
}
a{
  text-decoration: none;
}
.link-demos{
  color: #111;
  font-size: 1.5rem;
  font-weight: bold;
}
.link-wrapper{
  padding: 0.5rem;
  margin: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #fff;
  transition: all 0.2s ease-in-out;
}
</style>
