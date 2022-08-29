// vertex shader source
const VSHADER_CODE = `
  void main() {
    gl_Position = vec4(.0, .0, .0, 1.);
    gl_PointSize = 10.;
  }
`

// fragment shader source
const FSHADER_CODE = `
  void main() {
    gl_FragColor = vec4(.0, 1., .0, 1.);
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
  gl.attachShader(program, vshader)
  gl.deleteShader(vshader)
  gl.attachShader(program, fshader)
  gl.deleteShader(fshader)
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
  gl.clearColor(0, 0, .5, 1.)
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