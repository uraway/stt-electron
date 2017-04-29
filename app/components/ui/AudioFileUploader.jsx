import React, { Component } from 'react';

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

  handleAudioFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      e.target.value = null;
    } else {
      console.error('Upload Failed');
      return false;
    }

    reader.onload = () => {
      console.log(reader);
    };

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
