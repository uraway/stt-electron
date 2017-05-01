import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

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
    sendSpeechToText: PropTypes.func.isRequired
  }

  handleAudioFileUpload = (e) => {
    const { sendSpeechToText } = this.props;
    const file = e.target.files[0];
    const path = file.path;

    if (file) {
      sendSpeechToText(path);
      e.target.value = null;
    } else {
      console.error('Upload Failed');
      return false;
    }

    return true;
  }

  render() {
    const { speechToText } = this.props;
    return (
      <div>
        <RaisedButton
          label={speechToText.isRequesting ? 'Uploading Audio File...' : 'Choose Audio File'}
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
      </div>
    );
  }
}
