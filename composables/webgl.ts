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
    if (
      mod(gl_FragCoord.x, size) < 1. ||
      mod(gl_FragCoord.y, size) < 1.
    ) {
      gl_FragColor = vec4(.0, .0, .0, .8);
    } else {discard;}
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

export const useWebGl = (canvas) => {
  const gl = ref()
  onMounted(() => {
    canvas.value.width = 512
    canvas.value.height = 512
    gl.value = canvas.value.getContext('webgl')
    const vs = gl.value.createShader(gl.value.VERTEX_SHADER)
    gl.value.shaderSource(vs, VSHADER_CODE)
    console.log(gl.value)
    gl.value.compileShader(vs)
    const fs = gl.value.createShader(gl.value.FRAGMENT_SHADER)
    gl.value.shaderSource(fs, FSHADER_CODE)
    gl.value.compileShader(fs)
    const program = gl.value.createProgram()
    gl.value.attachShader(program, vs)
    gl.value.attachShader(program, fs)
    gl.value.linkProgram(program)
    gl.value.clear(gl.value.COLOR_BUFFER_BIT)
    gl.value.useProgram(program)
    const size = gl.value.getUniformLocation(program, 'size');
    gl.value.uniform1f(size, 32.)
    const vertices = new Float32Array([
      1., 1., .0,
      -1., 1., .0,
      1., -1., .0,
      -1., -1., .0
    ])
    const buffer = gl.value.createBuffer()
    gl.value.bindBuffer(gl.value.ARRAY_BUFFER, buffer)
    gl.value.bufferData(gl.value.ARRAY_BUFFER, vertices, gl.value.STATIC_DRAW)
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
    gl.value.drawArrays(gl.value.TRIANGEL, 0, 4)
  })
}