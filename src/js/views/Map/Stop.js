import { getCoords, RADIUS, TEXT_OFFSET } from './mapData.js'

export default {
  view({ attrs }) {
    const [x, y] = getCoords(attrs.x, attrs.y)

    return m('g.stop', [
      m('circle', { cx: x, cy: y, r: RADIUS }),
      m('text', { x, y: y + TEXT_OFFSET }, attrs.letter),
    ])
  },
}
