import data from '../data.js'
import state from '../state.js'

const Select = {
  view({ attrs }) {
    return m(
      'select[size=2]',
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
            key: stop,
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
      m('label.flex.flex-col', [
        'From:',
        m(Select, { name: 'from', reserved: state.to() }),
      ]),
      m(Toggle),
      m('label.flex.flex-col', [
        'To:',
        m(Select, { name: 'to', reserved: state.from() }),
      ]),
    ]
  },
}
