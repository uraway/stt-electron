import { ipcRenderer } from 'electron';

export const SPEECH_TO_TEXT_REQUEST = 'SPEECH_TO_TEXT_REQUEST';
export const SPEECH_TO_TEXT_SUCCESS = 'SPEECH_TO_TEXT_SUCCESS';
export const SPEECH_TO_TEXT_FAILURE = 'SPEECH_TO_TEXT_FAILURE';

export function sendSpeechToText(path) {
  return (dispatch) => {
    dispatch({
      type: SPEECH_TO_TEXT_REQUEST
    });
    ipcRenderer.send('speech-to-text-request', path);
  };
}
