import Form from './views/Form.js'
import Routes from './views/Routes.js'

const App = {
  view() {
    return [m(Form), m(Routes)]
  },
}

m.mount(document.getElementById('app'), App)
