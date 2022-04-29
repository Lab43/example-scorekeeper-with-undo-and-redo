import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './styles.css';
import App from './components/App';
import makeStore from './store';
import { loadPlayers } from './store/players';



const store = makeStore();

// load initial data
store.dispatch(loadPlayers());

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
