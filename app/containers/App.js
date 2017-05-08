import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ipcRenderer } from 'electron';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppCanvas from 'material-ui/internal/AppCanvas';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { purple900, darkWhite, lightWhite } from 'material-ui/styles/colors';
import withWidth, { MEDIUM, LARGE } from 'material-ui/utils/withWidth';
import spacing from 'material-ui/styles/spacing';

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

  static contextTypes = {
    router: PropTypes.object.isRequired,
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
        backgroundColor: purple900
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

  handleTouchTapLeftIconButton = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  };

  handleChangeRequestNavDrawer = (open) => {
    this.setState({
      navDrawerOpen: open,
    });
  };

  render() {
    const styles = this.getStyles();
    const showMenuIconButton = true;
    const title = 'Speech To Text';

    if (this.props.width === LARGE && title !== '') {
      styles.navDrawer = {
        zIndex: styles.appBar.zIndex - 1,
      };
    }

    return (
      <AppCanvas>
        <AppBar
          iconElementLeft={
            <IconButton
              iconClassName="muidocs-icon-custom-github"
              onTouchTap={() => ipcRenderer.send('click-github')}
            />
          }
          title={title}
          zDepth={0}
          style={styles.appBar}
          showMenuIconButton={showMenuIconButton}
        />
        <div style={styles.root}>
          <div style={styles.content}>
            {this.props.children}
          </div>
        </div>
      </AppCanvas>
    );
  }
}

export default withWidth()(App);
