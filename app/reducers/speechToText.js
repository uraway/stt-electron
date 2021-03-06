// @flow
import * as types from '../actions/speechToText';

const initialState = {
  type: null,
  errors: {},
  responses: {},
  isRequesting: false
};

export type speechToTextStateType = {
  speechToText: Object
};

type actionType = {
  type: string,
  err?: Object,
  res?: Object
};

export default function speechToText(state: Object = initialState, action: actionType) {
  const { type, res, err } = action;

  switch (type) {
    case types.SPEECH_TO_TEXT_REQUEST:
      return {
        type,
        res: {},
        err: {},
        isRequesting: true
      };
    case types.SPEECH_TO_TEXT_SUCCESS:
      return {
        type,
        res,
        err: {},
        isRequesting: false
      };
    case types.SPEECH_TO_TEXT_FAILURE:
      return {
        type,
        err,
        res: {},
        isRequesting: false
      };
    default:
      return state;
  }
}
