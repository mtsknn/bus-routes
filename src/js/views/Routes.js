import state from '../state.js'

const chunkSize = 10
const time = 100
let timeout

// Generating the routes is very fast but updating the UI is not, so here's a
// quick and dirty way to chunk the displaying of the routes
const chunkedRoutes = state.routes.map((routes) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => chunk(routes, chunkSize * 2), time)
  return routes.slice(0, chunkSize)
})

function chunk(routes, size) {
  if (chunkedRoutes().length >= routes.length) return

  chunkedRoutes(routes.slice(0, size))
  m.redraw()
  timeout = setTimeout(() => chunk(routes, size + chunkSize), time)
}

export default {
  view() {
    let previousDuration

    return m('table.routes[cellspacing=0]', [
      m('thead', [
        m('tr', [m('th.text-right', 'Duration'), m('th.text-left', 'Route')]),
      ]),
      m('tbody', [
        chunkedRoutes().map((route, i) => {
          const showDuration = previousDuration !== route.duration
          previousDuration = route.duration

          return m('tr', [
            m('td.text-right', showDuration && route.duration),
            m('td.text-left', [
              m('label', [
                m('input[type=radio][name=route]', {
                  checked: state.selectedRouteIndex() === i,
                  onchange() {
                    state.selectedRouteIndex(i)
                  },
                }),
                route.stops.map((stop, j) =>
                  m('span.stop', { class: route.buses[j] }, stop)
                ),
              ]),
            ]),
          ])
        }),
      ]),
    ])
  },
}
