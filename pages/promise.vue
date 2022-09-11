<script setup lang="ts">
// Promise
const alwaysLateBoy1 = ms => {
	new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, ms)
	}).then(() => {
		console.log(`${ms}ms遅れた`)
	})
}
// async/await
const alwaysLateBoy2 = async ms => {
	await new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, ms)
	})
	console.log(`${ms}ms遅れた`)
}
</script>

<template>
	<div>
		<h1>Promise</h1>
	</div>
</template>
