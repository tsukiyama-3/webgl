<script setup lang="ts">
console.log(1)
// お約束を取り付けたい処理にPromise
new Promise((resolve) => {
  // 1秒後に実行する処理
  setTimeout(() => {
    console.log(2)
    // 無事処理が終わったことを伝える
    resolve()
  }, 1000)
}).then(() => {
  // 処理が無事に終わったことを受け取って実行される処理
  console.log(3)
})
</script>

<template>
  <div>
    <h1>Promise</h1>
  </div>
</template>