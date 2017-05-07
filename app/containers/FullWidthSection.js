import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClearFix from 'material-ui/internal/ClearFix';
import withWidth from 'material-ui/utils/withWidth';

const styles = {
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: '100px',
    padding: '15px',
    boxSizing: 'border-box',
  },
  content: {
    maxWidth: 1200,
    margin: '0 auto',
  },
};

class FullWidthSection extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
    contentType: 'div',
  };

  render() {
    const {
      style,
    } = this.props;

    return (
      <ClearFix
        style={Object.assign(
          styles.root,
          style,
        )}
      >
        {this.props.children}
      </ClearFix>
    );
  }
}

export default withWidth()(FullWidthSection);
