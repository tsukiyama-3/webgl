export const useWebGl = (canvas) => {
  const gl = ref()
  onMounted(() => {
    canvas.value.width = 500
    canvas.value.height = 300
    gl.value = canvas.value.getContext('webgl') || canvas.value.getContext('experimental-webgl')
    gl.value.clearColor(.0, .0, .0, 1.)
    gl.value.clear(gl.value.COLOR_BUFFER_BIT)
  })
}