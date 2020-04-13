import data from './data.js'

const from = m.stream(data.stops[1])
const to = m.stream(data.stops[11])

export default { from, to }
