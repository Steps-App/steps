// reducer, logger imports
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { isBrowser } from './utils';

// Setup Redux middleware based on env
const middleware = [ thunkMiddleware ];
if (process.env.NODE_ENV !== 'production')
  middleware.push(createLogger());

export default createStore(
  rootReducer,
  applyMiddleware( ...middleware )
);
