<script setup lang="ts">
const promise = new Promise(resolve => {
	resolve()
}).then(() => [console.log('resolveしたよ')])
console.log(promise)
</script>

<template>
	<div>
		<h1>Promise</h1>
	</div>
</template>
