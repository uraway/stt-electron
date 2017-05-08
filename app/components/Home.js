import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import { Tabs, Tab } from 'material-ui/Tabs';

import * as types from '../actions/speechToText';
import ModelSelectField from './ui/ModelSelectField';
import TranscriptsView from './ui/TranscriptsView';

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
  textField: {
    width: '50%'
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
      transcripts: '',
      modelName: 'ja-JP_BroadbandModel',
      keywords: ''
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
      const results = speechToText.res.results.map((result) => (
          `Speaker ${result.speaker}: ${result.alternatives[0].transcript}\n\n`
      )).join('');
      this.setState({
        transcripts: results
      });
    }
  }

  handleAudioFileUpload = (e) => {
    const { sendSpeechToText } = this.props.speechToTextActions;
    const file = e.target.files[0];
    const path = file.path;
    const { modelName, keywords } = this.state;
    if (file) {
      const options = {
        audio: path,
        model: modelName,
        keywords: keywords.split(',')
      };
      sendSpeechToText({ options });
      e.target.value = null;
    } else {
      this.setState({ errorText: 'Upload Failed' });
      return false;
    }

    return true;
  }

  downloadTranscripts = () => {
    const file = encodeURI(`data:text/plain;charset=utf-8,${this.state.transcripts}`);
    ipcRenderer.send('download-file', file);
  }

  render() {
    const { speechToText } = this.props;
    const { modelName, keywords, transcripts } = this.state;

    return (
      <div>
        <h1>Transcribe your audio file</h1>
        <ul>
          <li>Up to 100MB</li>
          <li>.wav only</li>
        </ul>
        <ModelSelectField
          modelName={modelName}
          onChange={(value) => this.setState({ modelName: value })}
        />
        <br />
        <TextField
          style={styles.textField}
          floatingLabelText="Keywords to spot (Optional)"
          name="keywords"
          value={keywords}
          hintText="IBM, Watson, Audio, ..."
          onChange={(_e, value) => this.setState({ keywords: value })}
        />
        <br />
        <RaisedButton
          label={speechToText.isRequesting ? 'Uploading...' : 'Upload Audio File'}
          labelPosition="before"
          containerElement="label"
          style={styles.button}
          disabled={speechToText.isRequesting}
          icon={<FontIcon className="fa fa-upload" />}
        >
          <input
            style={styles.input}
            onChange={this.handleAudioFileUpload}
            type="file"
            disabled={speechToText.isRequesting}
          />
        </RaisedButton>
        <RaisedButton
          label={'Download transcripts'}
          labelPosition="before"
          containerElement="label"
          style={styles.button}
          disabled={speechToText.isRequesting}
          icon={<FontIcon className="fa fa-download" />}
          onTouchTap={this.downloadTranscripts}
        />
        <Tabs style={styles.tabs}>
          <Tab label="Transcripts">
            <TranscriptsView
              transcripts={transcripts}
            />
          </Tab>
          <Tab label="Keywords">
              Keywords
            </Tab>
          <Tab label="alternatives">
              Alternatives
            </Tab>
        </Tabs>
      </div>
    );
  }
}
