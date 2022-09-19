import { Ref } from 'vue'
import { createProgramFromCode } from './webgl'

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
  })
}