import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import modelJson from '../../utils/model.json';

const ModelSelectField = (props) => {
  const { onChange, value } = props;
  return (
    <SelectField
      floatingLabelText="Voice Model"
      value={value}
      onChange={onChange}
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
  value: PropTypes.string.isRequired
};

export default ModelSelectField;
