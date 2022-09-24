<script setup lang="ts">
import { Ref } from 'vue'
const canvas: Ref<HTMLCanvasElement> = ref()
useFramy(canvas)
</script>

<template>
	<div>
		<canvas ref="canvas"></canvas>
	</div>
</template>
