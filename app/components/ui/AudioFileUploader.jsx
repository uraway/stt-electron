import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

const styles = {
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

export default class AudioFileUploader extends Component {

  constructor() {
    super();
    this.state = {
      model: 'ja-JP_BroadbandModel',
      formattedMessages: [],
      audioSource: null,
      speakerLabels: false,
    };
  }

  handleAudioFileUpload = (e) => {
    const file = e.target.files[0];
    const path = file.path;

    if (file) {
      ipcRenderer.send('speech-to-text', path);
      e.target.value = null;
    } else {
      console.error('Upload Failed');
      return false;
    }

    return true;
  }

  render() {
    return (
      <button>
        <input
          style={styles.input}
          onChange={this.handleAudioFileUpload}
          type="file"
        />
      </button>
    );
  }
}
