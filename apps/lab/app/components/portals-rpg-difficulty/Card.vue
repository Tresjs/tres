<script setup lang="ts">
defineProps<{
  label: string
  description: string
  // A portal took over the screen: the focused frame gets out of the way, and
  // the others fade so they do not float over the blended scene.
  faded?: boolean
  popped?: boolean
  popDelay?: number
  popDuration?: number
}>()

// Drop the animation once landed, so the card is plain content in the Html
// layer again instead of its own composited layer.
const settled = ref(false)

const CORNERS = ['tl', 'tr', 'bl', 'br'] as const
const PIPS = ['t', 'b', 'l', 'r'] as const
</script>

<template>
  <div
    class="card"
    :class="{
      'card--faded': faded,
      'card--popped': popped && !settled,
      'card--settled': settled,
    }"
    :style="{
      '--pop-delay': `${popDelay ?? 0}s`,
      '--pop-duration': `${popDuration ?? 0.9}s`,
    }"
    @animationend.self="settled = true"
  >
    <div class="card__window">
      <div class="card__vignette" />
      <div class="card__fade" />
      <div class="card__rule" />
      <div class="card__rule card__rule--inner" />

      <div v-for="c in CORNERS" :key="c" class="card__corner" :class="`card__corner--${c}`">
        <svg
          viewBox="0 0 100 100" fill="none" stroke="currentColor"
          stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"
        >
          <!-- double quarter-round bracket hugging the corner -->
          <path d="M6 62 C6 31 31 6 62 6" />
          <path d="M14 62 C14 35 35 14 62 14" stroke-width="1" opacity=".7" />
          <!-- volute at each end of the bracket -->
          <path d="M6 62 C6 71 12 76 19 74 C24 72 25 65 21 62 C18 60 14 61 13 64" />
          <path d="M62 6 C71 6 76 12 74 19 C72 24 65 25 62 21 C60 18 61 14 64 13" />
          <!-- fleuron on the diagonal, outside the bracket -->
          <path d="M12 12 L18 6 L24 12 L18 18 Z" stroke-width="1" />
          <!-- leaf sprouts on the outside of the arc -->
          <path d="M9 44 C16 42 20 36 20 30" stroke-width=".9" opacity=".6" />
          <path d="M44 9 C42 16 36 20 30 20" stroke-width=".9" opacity=".6" />
        </svg>
      </div>

      <div v-for="p in PIPS" :key="p" class="card__pip" :class="`card__pip--${p}`">
        <svg
          viewBox="0 0 68 24" fill="none" stroke="currentColor"
          stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
        >
          <path d="M34 4 L40 12 L34 20 L28 12 Z" />
          <path d="M28 12 C22 12 16 10 10 6" />
          <path d="M40 12 C46 12 52 10 58 6" />
          <path d="M10 6 C7 8 4 9 1 9" stroke-width=".9" opacity=".6" />
          <path d="M58 6 C61 8 64 9 67 9" stroke-width=".9" opacity=".6" />
        </svg>
      </div>

      <div class="card__caption">
        <p class="card__title font-serif">
          {{ label }}
        </p>
        <p class="card__desc font-serif">
          "{{ description }}"
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* The card is exactly 200 x 300 px, which covers the 2 x 3 world-unit portal
   plane under <Html transform :distance-factor="4">, where one world unit is
   400 / distanceFactor px. Change either number and both must move together. */
.card {
  --rule: #d9c9a3; /* pale gold, between the #b4945f label and white */
  --gold: #b4945f;

  position: relative;
  box-sizing: border-box;
  width: 200px;
  height: 300px;
  transition: opacity 0.35s ease;
  transform: scale(0);
  pointer-events: none;
}

.card--faded {
  opacity: 0;
}

/* Keyframes sampled from gsap's elastic.out(1, 0.5), the frame mesh ease in
   Experience. Change one and regenerate the other. */
.card--popped {
  animation: card-pop var(--pop-duration) linear var(--pop-delay) both;
}

.card--settled {
  transform: none;
}

@keyframes card-pop {
  0% {
    transform: scale(0);
  }

  2.5% {
    transform: scale(0.2);
  }

  5% {
    transform: scale(0.428);
  }

  7.5% {
    transform: scale(0.651);
  }

  10% {
    transform: scale(0.845);
  }

  12.5% {
    transform: scale(1);
  }

  15% {
    transform: scale(1.109);
  }

  17.5% {
    transform: scale(1.175);
  }

  20% {
    transform: scale(1.202);
  }

  22.5% {
    transform: scale(1.2);
  }

  25% {
    transform: scale(1.177);
  }

  30% {
    transform: scale(1.101);
  }

  35% {
    transform: scale(1.027);
  }

  40% {
    transform: scale(0.981);
  }

  45% {
    transform: scale(0.964);
  }

  50% {
    transform: scale(0.969);
  }

  55% {
    transform: scale(0.982);
  }

  60% {
    transform: scale(0.995);
  }

  65% {
    transform: scale(1.003);
  }

  70% {
    transform: scale(1.006);
  }

  80% {
    transform: scale(1.003);
  }

  100% {
    transform: scale(1);
  }
}

/* Everything below sits against the window. The hairline draws the portal
   edge, now that there is no frame around it. */
.card__window {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 0 1px rgb(217 201 163 / 30%);
}

/* Darkens the portal towards its edges, so the rules stay readable whatever
   the scene inside happens to show. */
.card__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(125% 95% at 50% 40%, transparent 46%, rgb(0 0 0 / 48%) 100%);
}

/* Keeps the caption legible. Replaces the backdrop ShaderMaterial plane, which
   needed a polygonOffset bias to stop it flickering on the angled panels. */
.card__fade {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 46%;
  background: linear-gradient(to top, #000 4%, rgb(0 0 0 / 85%) 34%, transparent 100%);
}

.card__rule {
  position: absolute;
  inset: 6px;
  border: 1px solid var(--rule);
  opacity: 0.7;
}

.card__rule--inner {
  inset: 10px;
  border-color: rgb(255 255 255 / 20%);
  opacity: 0.55;
}

/* One ornament, four flips. */
.card__corner {
  position: absolute;
  width: 50px;
  height: 50px;
  color: var(--rule);
  opacity: 0.8;
}

.card__corner--tl { top: -3px; left: -3px; }
.card__corner--tr { top: -3px; right: -3px; transform: scaleX(-1); }
.card__corner--bl { bottom: -3px; left: -3px; transform: scaleY(-1); }
.card__corner--br { right: -3px; bottom: -3px; transform: scale(-1, -1); }

/* Fleuron at the middle of each edge. */
.card__pip {
  position: absolute;
  width: 34px;
  height: 12px;
  color: var(--rule);
  opacity: 0.7;
}

.card__pip--t { top: 0; left: 50%; margin-left: -17px; }
.card__pip--b { bottom: 0; left: 50%; margin-left: -17px; transform: scaleY(-1); }
.card__pip--l { top: 50%; left: -11px; margin-top: -6px; transform: rotate(-90deg); }
.card__pip--r { top: 50%; right: -11px; margin-top: -6px; transform: rotate(90deg); }

.card__caption {
  position: absolute;
  right: 0;
  bottom: 18px;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  text-align: center;
}

.card__title {
  margin: 0;
  font-size: 21px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 2px 14px rgb(0 0 0 / 90%);
}

.card__desc {
  margin: 0 20px;
  font-size: 12px;
  font-style: italic;
  line-height: 1.25;
  color: var(--gold);
}
</style>
