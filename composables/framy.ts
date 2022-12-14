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
    gl.clearColor(0, 0, .0, .0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const oneEight = 0.125

    // 四角を描画
    const drawRectangle = (pos) => {
      pos = pos.map(index => index * oneEight)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW)
      gl.drawArrays(gl.LINE_LOOP, 0, pos.length / 2)
    }
    // 塗りつぶしの四角を描画
    const fillRectangle = (pos) => {
      pos = pos.map(index => index * oneEight)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW)
      gl.drawArrays(gl.TRIANGLES, 0, pos.length / 2)
    }
    // 点を描画
    const drawPoints = (pos) => {
      pos = pos.map(index => index * oneEight)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW)
      gl.drawArrays(gl.POINTS, 0, 2)
    }

    // 頭
    const headPosition = [
      -5 , 5 ,
      -1, 5,
      -1, 1,
      -5, 1
    ]
    drawRectangle(headPosition)
    // 体
    const bodyPosition = [
      -1.5, 2,
      6.5, 2,
      6.5, -2,
      -1.5, -2
    ]
    drawRectangle(bodyPosition)
    // 口
    const mouthPosition = [
      -7, 2.5,
      -4, 2.5,
      -4, 1,
      -7, 1
    ]
    drawRectangle(mouthPosition)
    // 右前足
    const rightFrontLegPosition = [
      -1, -2,
      0, -2,
      0, -5,
      -1, -5
    ]
    drawRectangle(rightFrontLegPosition)
    // 左前足
    const leftFrontLegPosition = [
      0.5, -2,
      1.5, -2,
      1.5, -5,
      0.5, -5
    ]
    drawRectangle(leftFrontLegPosition)
    // 右後ろ足
    const rightBackLegPosition = [
      3.5, -2,
      4.5, -2,
      4.5, -5,
      3.5, -5
    ]
    drawRectangle(rightBackLegPosition)
    // 左後ろ足
    const leftBackLegPosition = [
      5, -2,
      6, -2,
      6, -5,
      5, -5
    ]
    drawRectangle(leftBackLegPosition)
    // 右耳
    const rightEarPosition = [
      -6, 6.5,
      -4, 6.5,
      -4, 4,
      -6, 4
    ]
    drawRectangle(rightEarPosition)
    // 左耳
    const leftEarPosition = [
      -2, 6.5,
      .5, 6.5,
      .5, 4,
      -2, 4
    ]
    drawRectangle(leftEarPosition)
    // 尻尾
    const tailPosition = [
      5.25, 1.75,
      7.25, 2.75,
      7.75, 2,
      5.75, 1
    ]
    drawRectangle(tailPosition)
    // 鼻
    const nousePosition = [
      -7, 2.5,
      -6, 2.5,
      -7, 2,
      -7, 2,
      -6, 2.5,
      -6, 2,
    ]
    fillRectangle(nousePosition)
    // 目
    const eyesPosition = [
      -4, 3,
      -2.5, 3,
    ]
    drawPoints(eyesPosition)
  })
}
