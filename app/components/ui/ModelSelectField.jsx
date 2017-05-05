import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import modelJson from '../../utils/model.json';

const styles = {
  selectField: {
    width: '100%'
  }
};

const ModelSelectField = (props) => {
  const { onChange, modelName } = props;
  return (
    <SelectField
      floatingLabelText="Voice Model"
      value={modelName}
      onChange={(e, index, value) => onChange(value)}
      style={styles.selectField}
    >
      {modelJson.map((model) => (
        <MenuItem
          value={model.name}
          key={model.name}
          primaryText={`${model.description.replace(/\.$/, '')} (${model.rate}HKz)`}
        />
      ))}
    </SelectField>
  );
};

ModelSelectField.propTypes = {
  onChange: PropTypes.func.isRequired,
  modelName: PropTypes.string.isRequired
};

export default ModelSelectField;
