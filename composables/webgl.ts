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

const render = (gl) => {
  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.POINTS, 0, 1)
}

export const useWebGl = (canvas) => {
  const gl = ref()
  onMounted(() => {
    canvas.value.width = 500
    canvas.value.height = 300
    gl.value = canvas.value.getContext('webgl2')
    if (!gl.value) {
      console.error('Faild to obtain WebGL 2.0 context')
      return
    }
    const program = createProgramFromCode(gl.value, VSHADER_CODE, FSHADER_CODE)
    gl.value.useProgram(program)

    render(gl.value)
  })
}