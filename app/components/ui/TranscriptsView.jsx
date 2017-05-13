import React from 'react';
import PropTypes from 'prop-types';

const TranscriptsView = (props) => {
  const { transcripts } = props;
  const styles = {
    textarea: {
      width: '98%',
      border: 'none',
      height: '200px',
      margin: '10px',
    }
  };
  return (
    <textarea
      style={styles.textarea}
      value={transcripts}
    />
  );
};

TranscriptsView.propTypes = {
  transcripts: PropTypes.string.isRequired
};

export default TranscriptsView;
