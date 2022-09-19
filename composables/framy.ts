import { Ref } from 'vue'
import { createProgramFromCode } from './webgl'
import { VSHADER_CODE } from './shader/v-framy-shader'
import { FSHADER_CODE } from './shader/f-framy-shader'

export const useFramy = (canvas: Ref<HTMLCanvasElement>) => {
  onMounted(() => {
    if (!(canvas.value instanceof HTMLCanvasElement)) {
      throw new Error('canvas要素がありません')
    }
    canvas.value.width = 300
    canvas.value.height = 300
    const gl = canvas.value.getContext('webgl2')
    if (!(gl instanceof WebGL2RenderingContext)) {
      throw new Error('WebGLの初期化に失敗しました')
    }
    const program = createProgramFromCode(gl, VSHADER_CODE, FSHADER_CODE)
    gl.useProgram(program)
    // 頂点バッファ
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    const positions = [
      0.0, 0.0, 0.0,
      1.0, 1.0, 0.0,
      -0.9, -0.4, 0.0,
      0.9, 0.4, 0.0
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
    gl.drawArrays(gl.LINES, 0, 4)
  }
}