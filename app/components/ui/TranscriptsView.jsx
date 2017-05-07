import React from 'react';
import PropTypes from 'prop-types';

const TranscriptsView = (props) => {
  const { transcripts } = props;
  const styles = {
    textarea: {
      border: 'none',
      width: '99%',
      height: '200px',
      margin: '10px'
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
