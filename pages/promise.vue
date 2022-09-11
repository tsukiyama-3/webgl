<script setup lang="ts">
const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, 1000)
}).then(() => {
  console.log('promise1終わったよ')
})

const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, 3000)
}).then(() => {
  console.log('promise2終わったよ')
})

Promise.all([promise1, promise2]).then(() => {
  console.log('全部終わったよ')
})
</script>

<template>
	<div>
		<h1>Promise</h1>
	</div>
</template>
