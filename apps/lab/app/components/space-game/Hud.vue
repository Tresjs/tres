<script setup lang="ts">
import { computed, inject, shallowRef } from 'vue'
import type { GameStore } from './GameStore'

const gameStore = inject('gameStore') as GameStore

const t = Date.now()

const score = computed(() => (gameStore.points >= 1000 ? `${(gameStore.points / 1000).toFixed(1)}K` : gameStore.points))
const seconds = shallowRef('0')
setInterval(() => seconds.value = ((Date.now() - t) / 1000).toFixed(1), 100)
</script>

<template>
  <div class="base UpperLeft" @click="gameStore.actions.toggleSound(!gameStore.sound)">
    sound
    <br>
    {{ gameStore.sound ? 'turn off' : 'turn on' }}
  </div>
  <div class="base UpperRight">
    <a href="https://codesandbox.io/p/sandbox/i2160">R3F original by 0xca0a</a>
    <br>
    <a href="https://twitter.com/0xca0a">0xca0a on twitter</a>
  </div>
  <div class="base LowerLeft">
    <h2>{{ seconds }}</h2>
    <h1>{{ score }}</h1>
  </div>
  <div class="base Global" />
</template>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Teko:wght@500&display=swap');

.base {
  position: absolute;
  font-family: 'Teko', sans-serif;
  font-weight: 500;
  font-variant-numeric: slashed-zero tabular-nums;
  text-transform: uppercase;
  line-height: 1em;
  pointer-events: none;
  color: indianred;
}

.UpperLeft {
  top: 40px;
  left: 50px;
  font-size: 2em;
  transform: skew(5deg, 5deg);
  pointer-events: all;
  cursor: pointer;

  @media only screen and (max-width: 900px) {
    font-size: 1.5em;
  }
}

.UpperRight {
  text-align: right;
  top: 40px;
  right: 50px;
  font-size: 2em;
  transform: skew(-5deg, -5deg);
  pointer-events: all;
  cursor: pointer;

  &>a {
    color: indianred;
    text-decoration: none;
  }

  @media only screen and (max-width: 900px) {
    font-size: 1.5em;
  }
}

.LowerLeft {
  bottom: 50px;
  left: 50px;
  transform: skew(-5deg, -5deg);
  width: 200px;

  &>h1 {
    margin: 0;
    font-size: 10em;
    line-height: 1em;
  }

  &>h2 {
    margin: 0;
    font-size: 4em;
    line-height: 1em;
  }

  @media only screen and (max-width: 900px) {
    bottom: 30px;

    &>h1 {
      font-size: 6em !important;
    }

    &>h2 {
      font-size: 3em !important;
    }
  }
}

.LowerRight {
  bottom: 70px;
  right: 50px;
  transform: skew(5deg, 5deg);
  height: 40px;
  width: 150px;
  background: black;

  &>div {
    height: 100%;
    background: indianred;
  }

  @media only screen and (max-width: 900px) {
    bottom: 50px;
    height: 40px;
    width: 150px;
  }
}

.Global {
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  user-select: none;
  overflow: hidden;
}

body {
  position: fixed;
  overflow: hidden;
  overscroll-behavior-y: none;
}
</style>