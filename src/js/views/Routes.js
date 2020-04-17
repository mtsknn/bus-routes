import state from '../state.js'

export default {
  view() {
    let previousDuration

    return m('table.routes[cellspacing=0]', [
      m('thead', [
        m('tr', [m('th.text-right', 'Duration'), m('th.text-left', 'Route')]),
      ]),
      m('tbody', [
        state.routes().map((route) => {
          const showDuration = previousDuration !== route.duration
          previousDuration = route.duration

          return m('tr', [
            m('td.text-right', showDuration && route.duration),
            m('td.text-left', [
              m('label', [
                m('input[type=radio][name=route]'),
                route.stops.map((stop, i) =>
                  m('span.stop', { class: route.buses[i] }, stop)
                ),
              ]),
            ]),
          ])
        }),
      ]),
    ])
  },
}
