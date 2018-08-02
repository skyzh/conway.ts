const d3 = require('d3')
const _ = require('lodash')
const $ = require('jquery')
const moment = require('moment')

import { N } from './const'
import { Conway, Render } from './kernel'

const init = () => {
  const row = () => _.times(N, _.constant(0))
  return _.times(N, () => row())
}

const blinker = (data, x, y) => { data[x][y] = data[x + 1][y] = data[x + 2][y] = true }
const random = data => {
  for (let i = 0; i < N; i++)
  for (let j = 0; j < N; j++)
    data[i][j] = _.random(0, 1) == 0 ? 1 : 0
}

let data = init()
random(data)

const canvas = Render.getCanvas();
document.getElementsByTagName('body')[0].appendChild(canvas);

const update = () => {
  data = Conway(data)
  Render(data)
  window.requestAnimationFrame(() => update())
}

update()
