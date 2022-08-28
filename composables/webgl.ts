const createShader = (gl, type, source) => {
  const shader = gl.createShader(type)
  if (shader === null) {
    console.error('Failed to create a shader')
    return null
  }
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!compiled) {
    const log = gl.getShaderInfoLog(shader)
    console.error('Failed to compile a shader\n' + log)
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export const useWebGl = (canvas) => {
  const gl = ref()
  onMounted(() => {
    canvas.value.width = 500
    canvas.value.height = 300
    gl.value = canvas.value.getContext('webgl')
    gl.value.clearColor(.0, .0, .0, 1.)
    gl.value.clear(gl.value.COLOR_BUFFER_BIT)
  })
}