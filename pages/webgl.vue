<script setup lang="ts">
const canvas = ref()
useWebGl(canvas)
</script>

<template>
  <div>
    <h1>WebGL</h1>
    <canvas ref="canvas"></canvas>
  </div>
</template>
