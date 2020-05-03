import data from '../../data.js'
import { stopLocations, viewBox } from './mapData.js'
import Road from './Road.js'
import Stop from './Stop.js'

export default {
  view() {
    return m('svg.map', { viewBox }, [
      data.roads.map((road) => {
        const { from, to, duration } = road
        const { x: x1, y: y1 } = stopLocations[from]
        const { x: x2, y: y2 } = stopLocations[to]

        return m(Road, { key: from + to, duration, x1, x2, y1, y2 })
      }),

      Object.entries(stopLocations).map(([letter, { x, y }]) =>
        m(Stop, { key: letter, letter, x, y })
      ),
    ])
  },
}
