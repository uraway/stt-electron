// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import AudioFileUploader from './ui/AudioFileUploader';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <AudioFileUploader />
        </div>
      </div>
    );
  }
}
