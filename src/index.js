import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux'
import store from './store'
import App from './components/containers/App';

const app = (
  <Provider store={store.createStore()}>
    <App/>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))