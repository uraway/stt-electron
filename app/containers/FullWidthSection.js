import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClearFix from 'material-ui/internal/ClearFix';
import spacing from 'material-ui/styles/spacing';
import withWidth, { SMALL, LARGE } from 'material-ui/utils/withWidth';

const desktopGutter = spacing.desktopGutter;

const styles = {
  root: {
    padding: '23px',
    boxSizing: 'border-box',
  },
  content: {
    maxWidth: 1200,
    margin: '0 auto',
  },
  rootWhenSmall: {
    paddingTop: desktopGutter * 2,
    paddingBottom: desktopGutter * 2,
  },
  rootWhenLarge: {
    paddingTop: desktopGutter * 3,
    paddingBottom: desktopGutter * 3,
  },
};

class FullWidthSection extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    width: PropTypes.number.isRequired,
  };

  static defaultProps = {
    style: {},
    contentType: 'div',
  };

  render() {
    const {
      style,
      width,
    } = this.props;

    return (
      <ClearFix
        style={Object.assign(
          styles.root,
          style,
          width === SMALL && styles.rootWhenSmall,
          width === LARGE && styles.rootWhenLarge)}
      >
        {this.props.children}
      </ClearFix>
    );
  }
}

export default withWidth()(FullWidthSection);
