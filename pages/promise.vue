<script setup lang="ts">
const promise = new Promise(resolve => {
	// 引数に文字列を渡す
	resolve('resolveしたよ')
}).then((val) => [
  console.log(val)
])
</script>

<template>
	<div>
		<h1>Promise</h1>
	</div>
</template>