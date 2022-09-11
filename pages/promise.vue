<script setup lang="ts">
const promise = new Promise((resolve, reject) => {
	resolve('test')
})
	.then(val => {
		console.log(`then1: ${val}`)
		return val
	})
	.catch(val => {
		console.log(`catch: ${val}`)
	})
	.then(val => {
		console.log(`then2: ${val}`)
	})
</script>

<template>
	<div>
		<h1>Promise</h1>
	</div>
</template>
