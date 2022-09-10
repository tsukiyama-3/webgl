<script setup lang="ts">
const promise = new Promise((resolve, reject) => {
	reject()
})
	.then(() => {
		console.log('resolveしたよ')
	})
	.catch(() => {
		console.log('rejectしたよ')
	})
</script>

<template>
	<div>
		<h1>Promise</h1>
	</div>
</template>
