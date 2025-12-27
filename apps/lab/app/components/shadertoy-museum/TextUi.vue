<script setup lang="ts">
import { watch, inject, type ShallowRef } from 'vue'
import type { ShaderToyMuseumState } from './const'

const state: ShaderToyMuseumState = inject('state')!

const title = shallowRef('')
const author = shallowRef('')
const description = shallowRef('')
const href = shallowRef('')
const expanded = shallowRef(true)

let remainingMutations = 100

watch(() => [state.title, state.author, state.description, state.href], () => {
  remainingMutations = 100
})

const C = '▇'

function mutate() {
  if (remainingMutations < 0) {
    return
  }
  remainingMutations--

  if (remainingMutations === 0) {
    title.value = state.title
    author.value = state.author
    description.value = state.description
    href.value = state.href
  } else {
    for (const [r, v] of ([[title, state.title], [author, state.author], [description, state.description], [href, state.href]] as [ShallowRef<string>, string][])) {
      if (!r.value || !v) {
        continue
      }
      const dLength = r.value.length - v.length
      if (dLength < 0) {
        r.value += v[r.value.length] === ' ' ? ' ' : C
      } else if (dLength > 0) {
        r.value = r.value.substring(0, r.value.length - 1)
      } else {
        const incorrectCharacterIndices = [] as number[];
        for (let i = 0; i < r.value.length; i++) {
          if (r.value[i] !== v[i]) incorrectCharacterIndices.push(i);
        }
        const dIncorrect = incorrectCharacterIndices.length
        if (dIncorrect > 0) {
          shuffle(incorrectCharacterIndices)
          const numToCorrect = dIncorrect > 10 ? Math.min(dIncorrect, Math.floor(Math.random() * 10 + 1)) : 1
          for (let i = 0; i < numToCorrect; i++) {
            const i = incorrectCharacterIndices.pop() as number
            const c = r.value[i]
            if (c === C) {
              r.value = replaceAt(r.value, i, v[i])
            } else {
              r.value = replaceAt(r.value, i, v[i] === ' ' ? ' ' : C)
            }
          }
        }
      }
    }
  }
}

function shuffle<T>(array: T[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function replaceAt(s: string, index: number, replacement: string) {
  return s.substring(0, index) + replacement + s.substring(index + replacement.length);
}

setInterval(mutate, 128 / 1000)

</script>

<template>
  <div class="container font-mono">
    <div class="inner">
      <div :aria-expanded="expanded" aria-controls="sect1">
        <button :title="expanded ? 'Close' : 'Open'" @click="expanded = !expanded"><span>{{ expanded ? '[x]' :
          '[-]' }}</span></button>
      </div>
      <div v-if="expanded" id="sect1">
        <div class="title"><span>{{ title }}</span></div>
        <div class="author"><span>{{ author }}</span></div>
        <div class="description"><span>{{ description }}</span></div>
        <div class="link"><span><a :href="state.href">{{ href }}</a></span></div>
        <button class="href cursor-pointer" @click="state.next()"><span>[Next]
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  background-color: transparent;
}

div.container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  pointer-events: none;

  color: #AAC;
  font-size: 14px;
}

div.inner {
  padding: 27px 18px;
}

div.inner>div {
  max-width: 300px;
  pointer-events: auto;
}

div.inner div span {
  display: inline-block;
  padding: 9px 6px;
  background-color: rgba(0, 0, 0, 0.5)
}
</style>