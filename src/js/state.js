import data from './data.js'
import getRoutes from './getRoutes.js'

const from = m.stream(data.stops[0])
const to = m.stream(data.stops[1])

const routes = m.stream.lift(
  (_from, _to) => {
    // The values are equal when they are being swapped
    if (_from === _to) return m.stream.SKIP

    return getRoutes(_from, _to).sort(
      (a, b) =>
        a.duration - b.duration ||
        // The last two conditions are unnecessary but nice
        a.busLines - b.busLines ||
        a.stops.length - b.stops.length
    )
  },
  from,
  to
)

export default Object.freeze({ from, to, routes })
