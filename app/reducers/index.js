// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import speechToText from './speechToText';

const rootReducer = combineReducers({
  counter,
  speechToText,
  router,
});

export default rootReducer;
