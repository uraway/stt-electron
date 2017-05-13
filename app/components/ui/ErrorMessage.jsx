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
  const getErrorMessage = () => {
    if (errors === null) return '';
    return (
      <p style={styles.errors}>
        {errors.raw.data}
      </p>
    );
  };

  return (
    <div>
      {getErrorMessage()}
    </div>
  );
};

ErrorMessage.propTypes = {
  errors: PropTypes.object
};

ErrorMessage.defaultProps = {
  errors: null
};

export default ErrorMessage;
