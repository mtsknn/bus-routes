import Form from './views/Form.js'
import Map from './views/Map/index.js'
import Routes from './views/Routes.js'

const App = {
  view() {
    return [
      m('.column', [
        m('.flex.flex-col', m(Form)),
        m('.mt.overflow-x-auto', m(Routes)),
      ]),
      m('.column.flex-grow', m(Map)),
    ]
  },
}

m.mount(document.getElementById('app'), App)
