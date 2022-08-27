<script setup lang="ts">
const canvas = ref()
useWebGl(canvas)
</script>

<template>
  <h1>WebGL</h1>
  <canvas ref="canvas"></canvas>
</template>