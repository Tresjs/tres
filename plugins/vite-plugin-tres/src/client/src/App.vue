<script setup lang="ts">
const bc = new BroadcastChannel("test_channel")
bc.postMessage("hello from client")

// A handler that only logs the event to the console:
bc.onmessage = event => {
 /*  console.log(event);
  console.log(JSON.parse(event.data.data)); */
};

window.addEventListener(
  "message",
  event => {
    console.log("message received", event.data);
  },
  false
);
</script>

<template>
  <main>
    <div>Visor Actividad</div>
  </main>
</template>
