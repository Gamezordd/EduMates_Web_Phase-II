import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Firebase, { FirebaseContext } from './components/Firebase';
// import { Provider } from 'react-redux';
// import { ConfigureStore } from './redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={ConfigureStore()}> */}
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
