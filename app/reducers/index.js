// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import speechToText from './speechToText';

const rootReducer = combineReducers({
  speechToText,
  router,
});

export default rootReducer;
