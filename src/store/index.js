import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import system from './system';
import players from './players';



const middleware = [thunk];

// only log redux state changes in development
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}


export default function makeStore (preloadedState) {
  return createStore(
    combineReducers({
      players,
      system,
    }),
    preloadedState,
    applyMiddleware(...middleware),
  );
}
