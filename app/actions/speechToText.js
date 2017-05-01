import { ipcRenderer } from 'electron';

export const SPEECH_TO_TEXT_REQUEST = 'SPEECH_TO_TEXT_REQUEST';
export const SPEECH_TO_TEXT_SUCCESS = 'SPEECH_TO_TEXT_SUCCESS';
export const SPEECH_TO_TEXT_FAILURE = 'SPEECH_TO_TEXT_FAILURE';

export function sendSpeechToText({ file }) {
  return (dispatch) => {
    dispatch({
      type: SPEECH_TO_TEXT_REQUEST
    });

    return ipcRenderer.send('speech-to-text-request', file);
  };
}

ipcRenderer.on('speech-to-text-success', () => (dispatch) => {
  dispatch({
    type: SPEECH_TO_TEXT_SUCCESS,
  });
});

ipcRenderer.on('speech-to-text-failure', (_e, errors) => (dispatch) => {
  dispatch({
    type: SPEECH_TO_TEXT_FAILURE,
    errors
  });
});
