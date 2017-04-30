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

  handleStream = (stream) => {
    this.stream = stream;
    this.captureSettings();

    // grab the formatted messages and also handle errors and such
    stream.on('data', this.handleFormattedMessage).on('end', this.handleTranscriptEnd).on('error', this.handleError);

    // when errors occur, the end event may not propagate through the helper streams.
    // However, the recognizeStream should always fire a end and close events
    stream.recognizeStream.on('end', () => {
      if (this.state.error) {
        console.log('end');
      }
    });

  // grab raw messages from the debugging events for display on the JSON tab
    stream.recognizeStream
    .on('message', (frame, json) => this.handleRawdMessage({ sent: false, frame, json }))
    .on('send-json', json => this.handleRawdMessage({ sent: true, json }))
    .once('send-data', () => this.handleRawdMessage({
      sent: true, binary: true, data: true // discard the binary data to avoid waisting memory
    }))
    .on('close', (code, message) => this.handleRawdMessage({ close: true, code, message }));

  // ['open','close','finish','end','error', 'pipe'].forEach(e => {
  //     stream.recognizeStream.on(e, console.log.bind(console, 'rs event: ', e));
  //     stream.on(e, console.log.bind(console, 'stream event: ', e));
  // });
  }

  handleRawdMessage = (msg) => {
    this.setState({ rawMessages: this.state.rawMessages.concat(msg) });
    console.log(msg);
  }

  getRecognizeOptions(extra) {
    return Object.assign({
      smart_formatting: true, // formats phone numbers, currency, etc. (server-side)
      format: true, // adds capitals, periods, and a few other things (client-side)
      model: this.state.model,
      objectMode: true,
      interim_results: true,
      continuous: true,
      timestamps: true, // set timestamps for each word - automatically turned on by speaker_labels
    }, extra);
  }

  captureSettings = () => {
    this.setState({
      settingsAtStreamStart: {
        model: this.state.model,
        speakerLabels: this.state.speakerLabels
      }
    });
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
