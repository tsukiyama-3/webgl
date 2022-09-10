<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
onMounted(() => {
	console.log(runtimeConfig.hoge)
})
console.log(runtimeConfig.hoge)
</script>

<template>
	<div>
		<h1>Computed</h1>
	</div>
</template>
