import state from '../../state.js'
import { getCoords, RADIUS, TEXT_OFFSET } from './mapData.js'

export default {
  view({ attrs }) {
    const [x, y] = getCoords(attrs.x, attrs.y)

    const isActive = state.selectedRoute().stops.includes(attrs.letter)
    const isEndpoint = [state.from(), state.to()].includes(attrs.letter)
    const classes = [
      isActive ? 'active' : '',
      isEndpoint ? 'endpoint' : '',
    ].join(' ')

    return m('g.stop', { class: classes }, [
      m('circle', { cx: x, cy: y, r: RADIUS }),
      m('text', { x, y: y + TEXT_OFFSET }, attrs.letter),
    ])
  },
}
