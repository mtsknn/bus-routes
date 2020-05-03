import data from '../../data.js'
import { stopLocations, viewBox } from './mapData.js'
import Road from './Road.js'
import Stop from './Stop.js'

export default {
  view() {
    return m('svg.map', { viewBox }, [
      m('defs', [
        m('polyline#arrow-head', {
          fill: 'transparent',
          points: '0,4 2,2 0,0',
        }),
        Object.keys(data.busLines).map((color) =>
          m(
            'marker',
            {
              id: `arrow-head-${color}`,
              markerWidth: '2',
              markerHeight: '4',
              orient: 'auto',
              refX: 2,
              refY: 2,
            },
            m('use[href="#arrow-head"]')
          )
        ),
      ]),

      data.roads.map((road) => m(Road, { key: road.from + road.to, road })),

      Object.entries(stopLocations).map(([letter, { x, y }]) =>
        m(Stop, { key: letter, letter, x, y })
      ),
    ])
  },
}
