import React from 'react';
import PropTypes from 'prop-types';
import { red500 } from 'material-ui/styles/colors';

const styles = {
  errors: {
    color: red500
  }
};

const ErrorMessage = (props) => {
  const { errors } = props;
  if (errors && errors.raw) {
    return (
      <p style={styles.errors}>
        {errors.raw.data}
      </p>
    );
  }
  return <div />;
};

ErrorMessage.propTypes = {
  errors: PropTypes.object
};

ErrorMessage.defaultProps = {
  errors: null
};

export default ErrorMessage;
