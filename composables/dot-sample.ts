import { Ref } from 'vue'
import { createProgramFromCode } from './webgl'
import { VSHADER_CODE } from './shader/vertex-shader'
import { FSHADER_CODE } from './shader/fragment-shader'

export const useDotSmaple = (canvas: Ref<HTMLCanvasElement>) => {
  const gl = ref()
  onMounted(() => {
    canvas.value.width = 300
    canvas.value.height = 300
    gl.value = canvas.value.getContext('webgl2')
    if (!gl.value) {
      console.error('Faild to obtain WebGL 2.0 context')
      return
    }
    console.log(VSHADER_CODE)
    const program = createProgramFromCode(gl.value, VSHADER_CODE, FSHADER_CODE)
    gl.value.useProgram(program)
    render(gl.value)
  })
  const render = (gl) => {
    gl.clearColor(0, 0, .5, 1.)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, 1)
  }
}
