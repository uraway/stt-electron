// @flow
import * as types from '../actions/speechToText';

const initialState = {
  type: null,
  errors: {},
  isRequesting: false
};

type actionType = {
  type: string,
  errors?: Object
};

export default function speechToText(state: Object = initialState, action: actionType) {
  const { type, errors } = action;

  switch (type) {
    case types.SPEECH_TO_TEXT_REQUEST:
      return {
        type,
        errors: {},
        isRequesting: true
      };
    case types.SPEECH_TO_TEXT_SUCCESS:
      return {
        type,
        errors: {},
        isRequesting: false
      };
    case types.SPEECH_TO_TEXT_FAILURE:
      return {
        type,
        errors,
        isRequesting: false
      };
    default:
      return state;
  }
}
