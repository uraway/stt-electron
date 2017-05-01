// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <MuiThemeProvider>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}
