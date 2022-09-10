<script setup lang="ts">
const count = ref(1)
const plusOne = computed(() => count.value + 1)
console.log(plusOne.value)
</script>

<template>
	<div>
		<h1>Computed</h1>
		<p>{{ count }}</p>
	</div>
</template>