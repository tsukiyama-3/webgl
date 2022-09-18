/**
 * シェーダーコードをコンパイルしてシェーダーオブジェクトを作成する
 * 作成に失敗した場合はnullを返す
 * 
 * @param gl WebGL コンテキスト
 * @param type gl.VERTEX_SAHDER あるいは gl.FRAGMENT_SHADER
 * @param source シェーダーのソースコード
 */
const createShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)
  if (shader === null) {
    console.error('Faild to create a shader')
    return null
  }
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  // check compile result
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!compiled) {
    const log = gl.getShaderInfoLog(shader)
    console.error('Faild to compile a shader\n' + log)
    gl.deleteShader(shader)
    return null
  }
  return shader
}

/**
 * シェーダーオブジェクトをリンクしてプログラムオブジェクトを作成する
 * 作成に失敗したら null を返す
 * 
 * @param gl WebGL コンテキスト
 * @param vshader 頂点シェーダー
 * @param fshader フラグメントシェーダー
 */
const createProgram = (gl: WebGL2RenderingContext, vshader: WebGLShader, fshader: WebGLShader) => {
  const program = gl.createProgram()
  if (!program) {
    return null
  }
  gl.attachShader(program, vshader)
  gl.deleteShader(vshader)
  gl.attachShader(program, fshader)
  gl.deleteShader(fshader)
  gl.linkProgram(program)

  // check link error
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!linked) {
    const log = gl.getProgramInfoLog(program)
    console.error('Faild to link a program\n' + log)
    gl.deleteProgram(program)
    return null
  }
  return program
}

export const createProgramFromCode = (gl: WebGL2RenderingContext, vshaderCode: string, fshaderCode: string) => {
  const vshader = createShader(gl, gl.VERTEX_SHADER, vshaderCode)
  if (!vshader) {
    console.log('hoge')
    return null
  }
  const fshader = createShader(gl, gl.FRAGMENT_SHADER, fshaderCode)
  if (!fshader) {
    console.log('hoge2')
    gl.deleteShader(vshader)
    return null
  }
  return createProgram(gl, vshader, fshader)
}