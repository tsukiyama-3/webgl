<script setup lang="ts">
import { Ref } from 'vue'
const canvas: Ref<HTMLCanvasElement> = ref()
useFramy(canvas)
</script>

<template>
  <div>
    <!-- <h1>FRAMY</h1> -->
    <canvas ref="canvas"></canvas>
  </div>
</template>