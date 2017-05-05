import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actionTypes from '../../actions/speechToText';

const styles = {
  textarea: {
    border: 'none',
    width: '99%',
    height: '200px',
    margin: '10px'
  }
};

export default class TranscriptsView extends Component {

  static propTyeps = {
    speechToText: PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      res: {
        results: []
      }
    };
  }

  componentWillReceiveProps(newProps) {
    const { speechToText } = newProps;
    if (speechToText.type === actionTypes.SPEECH_TO_TEXT_SUCCESS) {
      this.setState({ res: speechToText.res });
    }
  }

  render() {
    const { res } = this.state;
    const results = res.results.map((result) => (
        `Speaker ${result.speaker}: ${result.alternatives[0].transcript}\n\n`
    )).join('');
    return (
      <textarea
        style={styles.textarea}
        value={results}
      />
    );
  }
}
