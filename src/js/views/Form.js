import data from '../data.js'
import state from '../state.js'

const Select = {
  view({ attrs }) {
    return m(
      'select[size=2]',
      {
        onchange(e) {
          if (e.target.selectedIndex) {
            state[attrs.name](data.stops[e.target.selectedIndex])
          }
        },

        // Usually it would be enough to use just `onchange`, but because of the
        // rapidly firing timeouts in `Routes.js`, `onchange` is not always
        // triggered when using the mouse (possibly because the UI is busy
        // updating). Using both events might cause other issues, but you know,
        // "99 little bugs in the code" et cetera. 🤷‍♂️ Funnily, the `onchange`
        // handler in `Routes.js` seems to work well, so maybe the fundamental
        // issue is in using `<select>`
        onclick(e) {
          if (e.target.index) {
            state[attrs.name](data.stops[e.target.index])
          }
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
