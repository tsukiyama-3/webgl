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
    render(gl)
  })
  const render = (gl: WebGL2RenderingContext) => {
    gl.clearColor(0, 0, .5, 1.)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, 1)
  }
}
