<script setup lang="ts">
const canvas = ref()
const { onClick } = useWebGlSample(canvas)
</script>

<template>
	<div>
		<h1>WebGL</h1>
		<canvas ref="canvas" @click="onClick"></canvas>
	</div>
</template>