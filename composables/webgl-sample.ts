import { Ref } from 'vue'

// vertex shader source
const VSHADER_CODE = `
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
`

// fragment shader source
const FSHADER_CODE = `
  precision mediump float;
  uniform float size;
  void main() {
    if(
    mod(gl_FragCoord.x,size)<1.0 ||
    mod(gl_FragCoord.y,size)<1.0
    ){
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.8);
    }else {discard;}
  }
`

/**
 * シェーダーコードをコンパイルしてシェーダーオブジェクトを作成するメソッド
 * 失敗したっばいはnullを返す
 * 
 * @param gl WebGL コンテキスト
 * @param type gl.VERTEX_SHADER あるいは gl.FRAGMENT_SHADER
 * @param source シェーダーのソースコード
 */
const createShader = (gl, type, source) => {
  // WebGLShaderを作成する
  const shader = gl.createShader(type)
  // 作成できなかったらnullをreturn
  if (shader === null) {
    console.error('Failed to create a shader')
    return null
  }
  // シェーダーのソースを設定する
  gl.shaderSource(shader, source)
  // GLSLシェーダーをバイナリへコンパイルする
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

/**
 * シェーダーオブジェクトをリンクしてプログラムオブジェクトを作成するメソッド
 * 失敗したらnullを返す
 * 
 * @param gl WebGL コンテキスト
 * @param vshader 頂点シェーダーオブジェクト
 * @param fshader フラグメントシェーダーオブジェクト
 */
const createProgram = (gl, vshader, fshader) => {
  const program = gl.createProgram()
  if (!program) {
    return null
  }
  //  フラグメントか頂点のどちらかのWebGLShaderをWebGLProgramにアタッチして
  // WebGLShaderオブジェクトに削除マークをつけて、シェーダーが使用されなくなると削除する
  gl.attachShader(program, vshader)
  gl.deleteShader(vshader)
  gl.attachShader(program, fshader)
  gl.deleteShader(fshader)
  // 頂点シェーダーとフラグメントシェーダーをリンクする
  gl.linkProgram(program)
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!linked) {
    const log = gl.getProgramInfoLog(program)
    console.error('Failed to link a program\n' + log)
    gl.deleteProgram(program)
    return null
  }
  return program
}

/**
 * 頂点シェーダーとフラグメントシェーダーのソースコードから
 * プログラムオブジェクトを返すメソッド
 * 失敗したらnullを返す
 * 
 * @param gl WebGL コンテキスト
 * @param vshaderCode 頂点シェーダーのソースコード
 * @param fshaderCode フラグメントシェーダーのソースコード
 */
const createProgramFromCode = (gl, vshaderCode, fshaderCode) => {
  const vshader = createShader(gl, gl.VERTEX_SHADER, vshaderCode)
  if (!vshader) {
    return null
  }
  const fshader = createShader(gl, gl.FRAGMENT_SHADER, fshaderCode)
  if (!fshader) {
    gl.deleteShader(vshader)
    return null
  }
  return createProgram(gl, vshader, fshader)
}

const createBuffer = (data, gl) => {
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
}

const render = (gl) => {
  // gl.clearColor(0, 0, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // gl.drawArrays(gl.POINTS, 0, 1);
}

const vertices = new Float32Array([
  1.0, 1.0, 0.0,
  -1.0, 1.0, 0.0,
  1.0, -1.0, 0.0,
  -1.0, -1.0, 0.0
])

const hex2rgb = (hex: string): [number, number, number] => {
  return [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255
  ]
}

const normalize = (cx: number, cy: number) => {
  const mid = size / 2
  const x = (cx - mid) / mid + 1 / size
  const y = (mid - cy) / mid - 1 / size
  return [x, y, 0]
}

const dotSize: number = 32
const pixels: Ref<Array<[number, number, string]>> = ref([])
const color: Ref<string> = ref('#ff0000')

export const useWebGlSample = (canvas) => {
  const gl = ref()
  onMounted(() => {
    canvas.value.width = 512
    canvas.value.height = 512
    gl.value = canvas.value.getContext('webgl2')
    gl.value.clear(gl.value.COLOR_BUFFER_BIT)
    const program = createProgramFromCode(gl.value, VSHADER_CODE, FSHADER_CODE)
    gl.value.useProgram(program)
    const size = gl.value.getUniformLocation(program, 'size')
    gl.value.uniform1f(size, 32)
    createBuffer(vertices, gl.value)
    const position = gl.value.getAttribLocation(program, 'position')
    gl.value.vertexAttribPointer(
      position,
      3,
      gl.value.FLOAT,
      false,
      0,
      0
    )
    gl.value.enableVertexAttribArray(position)
    gl.value.drawArrays(gl.value.TRIANGLE_STRIP, 0, 4)
  })
  const render = () => {
    gl.value.clear(gl.value.COLOR_BUFFER_BIT)
    const points = pixels.value.length
    const selectedPoints = []
  }
  const recordPoint = (x, y) => {
    pixels.value = pixels.value.filter(([px, py]) => x !== px || y !== py)
    if (color.value) {
      pixels.value.push([x, y, color.value])
    }
  }
  const onClick = (e) => {
    const x = Math.floor(e.offsetX / dotSize * window.devicePixelRatio)
    const y = Math.floor(e.offsetY / dotSize * window.devicePixelRatio)
    recordPoint(x, y)
    console.log(x, y)
  }
  return { onClick }
}