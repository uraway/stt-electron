// @flow
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppCanvas from 'material-ui/internal/AppCanvas';
import { purple900 } from 'material-ui/styles/colors';

import Footer from './Footer';

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

const styles = {
  content: {
    margin: 50
  },
};

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
        <div style={styles.content}>
          {this.props.children}
        </div>
        <Footer />
      </AppCanvas>
    );
  }
}
