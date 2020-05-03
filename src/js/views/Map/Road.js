import { getCoords, TEXT_OFFSET } from './mapData.js'

export default {
  view({ attrs }) {
    const [x1, y1] = getCoords(attrs.x1, attrs.y1)
    const [x2, y2] = getCoords(attrs.x2, attrs.y2)

    const middleX = (x1 + x2) / 2
    const middleY = (y1 + y2) / 2 + TEXT_OFFSET

    return m('g.road', [
      m('line', { x1, x2, y1, y2 }),
      m('text', { x: middleX, y: middleY }, attrs.duration),
    ])
  },
}
