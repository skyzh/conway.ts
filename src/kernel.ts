const GPU = require('gpu.js')
import { N, CELL_A } from './const'

const gpu = new GPU()

export const Conway = gpu.createKernel(function(data) {
  var sum = 0
  for (var i = -1; i <= 1; i++)
  for (var j = -1; j <= 1; j++) {
    if (!(i == 0 && j == 0)) {
      let x = this.thread.x + i, y = this.thread.y + j
      if (x >= 0 && x < this.constants.N && y >= 0 && y < this.constants.N) {
        if (data[y][x] == 1) ++sum
      }
    }
  }
  if (data[this.thread.y][this.thread.x] == 1) {
    if (sum < 2 || sum > 3) return 0
    else return 1
  } else {
    if (sum == 3) return 1
    else return 0
  }
}, {
  constants: { N },
  output: [N, N],
})

export const Render = gpu.createKernel(function(data) {
  var x = Math.floor(this.thread.y / this.constants.CELL_A)
  var y = Math.floor(this.thread.x / this.constants.CELL_A)
  if (data[x][y] == 1) this.color(0, 0, 0, 1)
  else this.color(255, 255, 255, 1)
}, {
  constants: { CELL_A },
  output: [N * CELL_A, N * CELL_A],
  graphical: true
})
