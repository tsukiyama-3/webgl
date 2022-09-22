import { Ref } from 'vue'
import { createProgramFromCode } from './webgl'
import { VSHADER_CODE } from './shader/v-framy-shader'
import { FSHADER_CODE } from './shader/f-framy-shader'

export const useFramy = (canvas: Ref<HTMLCanvasElement>) => {
  onMounted(() => {
    if (!(canvas.value instanceof HTMLCanvasElement)) {
      throw new Error('canvas要素がありません')
    }
    canvas.value.width = 512
    canvas.value.height = 512
    const gl = canvas.value.getContext('webgl2')
    if (!(gl instanceof WebGL2RenderingContext)) {
      throw new Error('WebGLの初期化に失敗しました')
    }
    // GLSLプログラムをGPUにアップロード
    const program = createProgramFromCode(gl, VSHADER_CODE, FSHADER_CODE)
    // 作成したプログラムを設定する
    gl.useProgram(program)
    // 頂点バッファ
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    const index = gl.getAttribLocation(program, 'a_position')
    const size = 2
    const type = gl.FLOAT
    const normalized = false
    const stride = 0
    const offset = 0
    gl.vertexAttribPointer(index, size, type, normalized, stride, offset)
    gl.enableVertexAttribArray(index)
    render(gl)
    const positions = [
      -0.625, 0.625,
      -0.125, 0.625,
      -0.125, 0.125,
      -0.625, 0.125
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINE_LOOP, 0, 4)
    const positions2 = [
      -0.1875, 0.25,
      0.8125, 0.25,
      0.8125, -0.25,
      -0.1875, -0.25
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions2), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINE_LOOP, 0, 4)
    const positions3 = [
      -0.875, 0.3125,
      -0.5, 0.3125,
      -0.5, 0.125,
      -0.875, 0.125
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions3), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINE_LOOP, 0, 4)
    const positions4 = [
      -0.125, -0.25,
      0, -0.25,
      0, -0.625,
      -0.125, -0.625
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions4), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINE_LOOP, 0, 4)
    const positions5 = [
      0.0625, -0.25,
      0.1875, -0.25,
      0.1875, -0.625,
      0.0625, -0.625
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions5), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINE_LOOP, 0, 4)
    const positions6 = [
      0.4375, -0.25,
      0.5625, -0.25,
      0.5625, -0.625,
      0.4375, -0.625
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions6), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINE_LOOP, 0, 4)
    const positions7 = [
      0.625, -0.25,
      0.75, -0.25,
      0.75, -0.625,
      0.625, -0.625
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions7), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINE_LOOP, 0, 4)
  })
  const render = (gl: WebGL2RenderingContext) => {
    gl.clearColor(0, 0, .0, .0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }
}