import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppCanvas from 'material-ui/internal/AppCanvas';
import { purple900, darkWhite, lightWhite } from 'material-ui/styles/colors';
import withWidth, { MEDIUM, LARGE } from 'material-ui/utils/withWidth';
import spacing from 'material-ui/styles/spacing';

import AppNavDrawer from './AppNavDrawer';

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
  },
});

class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    width: PropTypes.number.isRequired,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    navDrawerOpen: false,
  };

  getChildContext = () => ({
    muiTheme: getMuiTheme(muiTheme),
  })

  componentWillMount() {
    this.setState({
      muiTheme: getMuiTheme(),
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  }

  getStyles() {
    const styles = {
      appBar: {
        position: 'fixed',
      // Needed to overlap the examples
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400,
      },
      content: {
        margin: spacing.desktopGutter,
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
        maxWidth: 356,
      },
    };

    if (this.props.width === MEDIUM || this.props.width === LARGE) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }

    return styles;
  }

  handleChangeList = (event, value) => {
    this.context.router.push(value);
    this.setState({
      navDrawerOpen: false,
    });
  };

  render() {
    let {
      navDrawerOpen,
    } = this.state;
    const styles = this.getStyles();

    let docked = false;

    if (this.props.width === LARGE) {
      docked = true;
      navDrawerOpen = true;

      styles.navDrawer = {
        zIndex: styles.appBar.zIndex - 1,
      };
      styles.root.paddingLeft = 256;
    }

    return (
      <AppCanvas>
        <div style={styles.root}>
          <div style={styles.content}>
            {this.props.children}
          </div>
          <AppNavDrawer
            docked={docked}
            onChangeList={this.handleChangeList}
            open={navDrawerOpen}
          />
        </div>
      </AppCanvas>
    );
  }
}

export default withWidth()(App);
