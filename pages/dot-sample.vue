<script setup lang="ts">
import { Ref } from 'vue'
const canvas: Ref<HTMLCanvasElement> = ref(null)
useDotSmaple(canvas)
</script>

<template>
	<div>
		<h1>DOT SAMPLE</h1>
		<canvas ref="canvas"></canvas>
	</div>
</template>
