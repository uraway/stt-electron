// @flow
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppCanvas from 'material-ui/internal/AppCanvas';
import { purple900 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  tabs: {
    backgroundColor: purple900,
  },
  raisedButton: {
    textColor: '#ffffff',
    color: purple900,
  },
  textField: {
    floatingLabelColor: purple900,
    focusColor: purple900
  }
});

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      muiTheme: getMuiTheme(muiTheme),
    };
  }

  render() {
    return (
      <AppCanvas>
        {this.props.children}
      </AppCanvas>
    );
  }
}
