import state from '../../state.js'
import { getCoords, RADIUS, stopLocations, TEXT_OFFSET } from './mapData.js'

export default {
  view({ attrs }) {
    const { road } = attrs
    let { from, to } = road

    const activeRoad = state
      .selectedRoute()
      .roads.find(
        (_road) =>
          (_road.from === from && _road.to === to) ||
          (_road.from === to && _road.to === from)
      )

    // Swap to make the arrow head point to the correct direction
    if (activeRoad?.backwards) [from, to] = [to, from]

    const color = activeRoad?.bus
    const classes = color && `active ${color}`

    let { x: x1, y: y1 } = stopLocations[from]
    let { x: x2, y: y2 } = stopLocations[to]

    ;[x1, y1] = getCoords(x1, y1)
    ;[x2, y2] = getCoords(x2, y2)

    // Start the lines from the circles' edges instead of the centers to make
    // the arrow heads visible (otherwise they would be under the circles)
    const offset = x1 !== x2 && y1 !== y2 ? RADIUS / Math.sqrt(2) : RADIUS

    if (x2 > x1) {
      x1 += offset
      x2 -= offset
    } else if (x1 > x2) {
      x1 -= offset
      x2 += offset
    }

    if (y2 > y1) {
      y1 += offset
      y2 -= offset
    } else if (y1 > y2) {
      y1 -= offset
      y2 += offset
    }

    const middleX = (x1 + x2) / 2
    const middleY = (y1 + y2) / 2 + TEXT_OFFSET

    return m('g.road', { class: classes }, [
      m('line', {
        'marker-end': color && `url(#arrow-head-${color})`,
        x1,
        x2,
        y1,
        y2,
      }),
      m('text', { x: middleX, y: middleY }, road.duration),
    ])
  },
}
