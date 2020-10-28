import React from 'react';
import ReactDOM from 'react-dom';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './app/layout/style.scss';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'semantic-ui-less/semantic.less'
import { configStore } from './app/store/configStore';
import ScrollToTop from './app/common/util/ScrollToTop';
import moment from "moment";
import 'moment/locale/pl'  

const store = configStore();

const rootElement = document.getElementById('root');


let render = () => {
  moment.locale('pl')

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <ReduxToastr closeOnToastrClick transitionIn="bounceInDown" transitionOut="bounceOutUp" />
        <App />
      </BrowserRouter>
    </Provider>
    , rootElement)
}

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render)
  })
}

store.firebaseAuthIsReady.then(() => {
  render();
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
