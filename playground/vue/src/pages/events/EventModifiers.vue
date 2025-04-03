<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ThreeEvent } from '@tresjs/core/types'
import { Box, Cylinder, Sphere } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { Color } from 'three'

const COLORS = 'red|orange|yellow|green|blue|purple'.split('|')

function choice<T>(arr: T[]): T {
  return arr[(Math.floor(Math.random() * arr.length))]
}

function fn(e: ThreeEvent<any>) {
  e.currentTarget.material.color = new Color(choice(COLORS))
}
</script>

<template>
  <div class="demo">
    <div>
      <h1>Event Modifiers</h1>
      <p>Tres supports Vue-style events, meaning that most <a href="https://vuejs.org/guide/essentials/event-handling.html#event-modifiers">Vue event modifiers</a> work.</p>
      <h3>Exceptions</h3>
      <ul>
        <li>once</li>
        <li>capture</li>
        <li>passive</li>
      </ul>
      <h2>Examples</h2>
      <p>In the examples below, cylinder is a child of box, box is a child of sphere.</p>
    </div>
    <div class="container">
      <div class="aspect-video">
        <h2>@click (no event modifiers)</h2>
        <TresCanvas clear-color="#333333">
          <Sphere :position-y="0.6" :scale="0.06" @click="fn">
            <Box :position-y="-10" :scale="5" @click="fn">
              <Cylinder :position-y="-4" :scale="1.5" @click="fn" />
            </Box>
          </Sphere>
        </TresCanvas>
      </div>
      <div class="aspect-video">
        <h2>@click.right</h2>
        <TresCanvas clear-color="#333333">
          <Sphere :position-y="0.6" :scale="0.06" @click.right="fn">
            <Box :position-y="-10" :scale="5" @click.right="fn">
              <Cylinder :position-y="-4" :scale="1.5" @click.right="fn" />
            </Box>
          </Sphere>
        </TresCanvas>
      </div>
      <div class="aspect-video">
        <h2>@click.right.prevent</h2>
        <TresCanvas clear-color="#333333">
          <Sphere :position-y="0.6" :scale="0.06" @click.right.prevent="fn">
            <Box :position-y="-10" :scale="5" @click.right.prevent="fn">
              <Cylinder :position-y="-4" :scale="1.5" @click.right.prevent="fn" />
            </Box>
          </Sphere>
        </TresCanvas>
      </div>
      <div class="aspect-video">
        <h2>@pointerdown.middle.prevent</h2>
        <TresCanvas clear-color="#333333" @pointerdown.middle.prevent>
          <Sphere :position-y="0.6" :scale="0.06" @pointerdown.middle.prevent="fn">
            <Box :position-y="-10" :scale="5" @pointerdown.middle.prevent="fn">
              <Cylinder :position-y="-4" :scale="1.5" @pointerdown.middle.prevent="fn" />
            </Box>
          </Sphere>
        </TresCanvas>
      </div>
      <div class="aspect-video">
        <h2>@click.self</h2>
        <TresCanvas clear-color="#333333">
          <Sphere :position-y="0.6" :scale="0.06" @click.self="fn">
            <Box :position-y="-10" :scale="5" @click.self="fn">
              <Cylinder :position-y="-4" :scale="1.5" @click.self="fn" />
            </Box>
          </Sphere>
        </TresCanvas>
      </div>
      <div class="aspect-video">
        <h2>@click.stop</h2>
        <TresCanvas clear-color="#333333">
          <Sphere :position-y="0.6" :scale="0.06" @click.stop="fn">
            <Box :position-y="-10" :scale="5" @click.stop="fn">
              <Cylinder :position-y="-4" :scale="1.5" @click.stop="fn" />
            </Box>
          </Sphere>
        </TresCanvas>
      </div>
      <div class="aspect-video">
        <h2>@click.shift</h2>
        <TresCanvas clear-color="#333333">
          <Sphere :position-y="0.6" :scale="0.06" @click.shift="fn">
            <Box :position-y="-10" :scale="5" @click.shift="fn">
              <Cylinder :position-y="-4" :scale="1.5" @click.shift="fn" />
            </Box>
          </Sphere>
        </TresCanvas>
      </div>
      <div class="aspect-video">
        <h2>@click.shift.exact</h2>
        <TresCanvas clear-color="#333333">
          <Sphere :position-y="0.6" :scale="0.06" @click.shift.exact="fn">
            <Box :position-y="-10" :scale="5" @click.shift.exact="fn">
              <Cylinder :position-y="-4" :scale="1.5" @click.shift.exact="fn" />
            </Box>
          </Sphere>
        </TresCanvas>
      </div>
      <div class="aspect-video">
        <h2>@click.alt</h2>
        <TresCanvas clear-color="#333333">
          <Sphere :position-y="0.6" :scale="0.06" @click.alt="fn">
            <Box :position-y="-10" :scale="5" @click.alt="fn">
              <Cylinder :position-y="-4" :scale="1.5" @click.alt="fn" />
            </Box>
          </Sphere>
        </TresCanvas>
      </div>
      <div class="aspect-video">
        <h2>@click.alt.shift</h2>
        <TresCanvas clear-color="#333333">
          <Sphere :position-y="0.6" :scale="0.06" @click.alt.shift="fn">
            <Box :position-y="-10" :scale="5" @click.alt.shift="fn">
              <Cylinder :position-y="-4" :scale="1.5" @click.alt.shift="fn" />
            </Box>
          </Sphere>
        </TresCanvas>
      </div>
      <div class="aspect-video">
        <h2>@click.meta</h2>
        <TresCanvas clear-color="#333333">
          <Sphere :position-y="0.6" :scale="0.06" @click.meta="fn">
            <Box :position-y="-10" :scale="5" @click.meta="fn">
              <Cylinder :position-y="-4" :scale="1.5" @click.meta="fn" />
            </Box>
          </Sphere>
        </TresCanvas>
      </div>
      <div class="aspect-video">
        <h2>@pointermove.shift</h2>
        <TresCanvas clear-color="#333333">
          <Sphere :position-y="0.6" :scale="0.06" @pointermove.shift="fn">
            <Box :position-y="-10" :scale="5" @pointermove.shift="fn">
              <Cylinder :position-y="-4" :scale="1.5" @pointermove.shift="fn" />
            </Box>
          </Sphere>
        </TresCanvas>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
}

div.aspect-video {
  max-height: 300px;
  position: relative;
  margin-bottom: 10px;
}

.aspect-video h2 {
  position: absolute;
  top: 0;
  color: #fff;
  z-index: 10;
}

.container {
  display: grid;
}

.demo {
  padding: 50px;
}

h1,
h2,
h3,
p,
li {
  font-family: sans-serif;
}

body {
  padding: 50px;
}
</style>
