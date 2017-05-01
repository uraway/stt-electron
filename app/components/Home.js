import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import * as types from '../actions/speechToText';

const styles = {
  button: {
    margin: 12,
  },
  input: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

export default class Home extends Component {

  static propTypes = {
    speechToText: PropTypes.object.isRequired,
    speechToTextActions: PropTypes.shape({
      sendSpeechToText: PropTypes.func.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      errorText: '',
      transaction: ''
    };

    const { dispatch } = props;

    ipcRenderer.on('speech-to-text-success', (_e, res) => {
      dispatch({
        type: types.SPEECH_TO_TEXT_SUCCESS,
        res
      });
    });

    ipcRenderer.on('speech-to-text-failure', (_e, err) => {
      dispatch({
        type: types.SPEECH_TO_TEXT_FAILURE,
        err
      });
    });
  }


  componentWillReceiveProps(newProps) {
    const { speechToText } = newProps;
    if (speechToText.type === types.SPEECH_TO_TEXT_SUCCESS) {
      this.setState({
        transaction: ''
      });
    }
  }

  handleAudioFileUpload = (e) => {
    const { sendSpeechToText } = this.props.speechToTextActions;
    const file = e.target.files[0];
    const path = file.path;

    if (file) {
      sendSpeechToText(path);
      e.target.value = null;
    } else {
      this.setState({ errorText: 'Upload Failed' });
      return false;
    }

    return true;
  }

  render() {
    const { speechToText } = this.props;
    const { transaction } = this.state;
    return (
      <div>
        <RaisedButton
          label={speechToText.isRequesting ? 'Uploading...' : 'Choose Audio File'}
          labelPosition="before"
          containerElement="label"
          style={styles.button}
          disabled={speechToText.isRequesting}
        >
          <input
            style={styles.input}
            onChange={this.handleAudioFileUpload}
            type="file"
            disabled={speechToText.isRequesting}
          />
        </RaisedButton>
        <TextField
          name="transaction"
          value={transaction}
        />
      </div>
    );
  }
}
