// @flow
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DefaultBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import AppCanvas from 'material-ui/internal/AppCanvas';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      muiTheme: getMuiTheme(DefaultBaseTheme),
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
