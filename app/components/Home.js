// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Home.css';
import AudioFileUploader from './ui/AudioFileUploader';

export default class Home extends Component {

  static propTypes = {
    speechToText: PropTypes.object.isRequired,
    sendSpeechToText: PropTypes.func.isRequired
  }

  render() {
    const { speechToText, sendSpeechToText } = this.props;
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <AudioFileUploader
            speechToText={speechToText}
            handleSpeechToText={sendSpeechToText}
          />
        </div>
      </div>
    );
  }
}
