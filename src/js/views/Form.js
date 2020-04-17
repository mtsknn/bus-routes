import data from '../data.js'
import state from '../state.js'

const Select = {
  view({ attrs }) {
    return m(
      'select',
      {
        onchange(e) {
          state[attrs.name](data.stops[e.target.selectedIndex])
        },
      },
      data.stops.map((stop) =>
        m(
          'option',
          {
            disabled: attrs.reserved === stop,
            selected: state[attrs.name]() === stop,
          },
          stop
        )
      )
    )
  },
}

const Toggle = {
  view() {
    return m(
      'button.toggle',
      {
        onclick() {
          const [from, to] = [state.from(), state.to()]
          state.from(to)
          state.to(from)
        },
      },
      '🔄'
    )
  },
}

export default {
  view() {
    return [
      'From: ',
      m(Select, { name: 'from', reserved: state.to() }),
      m(Toggle),
      'To: ',
      m(Select, { name: 'to', reserved: state.from() }),
    ]
  },
}
