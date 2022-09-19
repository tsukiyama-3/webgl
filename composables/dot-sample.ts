import { Ref } from 'vue'
import { createProgramFromCode } from './webgl'
import { VSHADER_CODE } from './shader/vertex-shader'
import { FSHADER_CODE } from './shader/fragment-shader'

export const useDotSmaple = (canvas: Ref<HTMLCanvasElement>) => {
  onMounted(() => {
    canvas.value.width = 300
    canvas.value.height = 300
    const gl = canvas.value.getContext('webgl2')
    if (!gl) {
      console.error('Faild to obtain WebGL 2.0 context')
      return
    }
    const program = createProgramFromCode(gl, VSHADER_CODE, FSHADER_CODE)
    gl.useProgram(program)
    // 頂点バッファ
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    const positions = [
      0, 0,
      0, 0.5,
      0.7, 0,
      0, 0,
      0, -0.5,
      -0.7, 0
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
    const index = gl.getAttribLocation(program, 'a_position')
    const size = 2
    const type = gl.FLOAT
    const normalized = false
    const stride = 0
    const offset = 0
    gl.vertexAttribPointer(index, size, type, normalized, stride, offset)
    gl.enableVertexAttribArray(index)
    render(gl)
  })
  const render = (gl: WebGL2RenderingContext) => {
    gl.clearColor(0, 0, .0, .0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    console.log(gl.POINTS)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }
}
