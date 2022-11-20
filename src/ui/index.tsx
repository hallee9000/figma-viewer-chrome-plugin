import * as ReactDOM from 'react-dom'
import App from './App'

import GlobalStyle from './assets/global'
import { rootId } from './utils/constants'
import { injectRootNode } from './utils/init'

injectRootNode(function () {
  ReactDOM.render(
    <>
      <GlobalStyle/>
      <App />
    </>,
    document.getElementById(rootId)
  )  
})
