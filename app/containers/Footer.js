import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import { grey900, lightWhite, darkWhite } from 'material-ui/styles/colors';

import FullWidthSection from './FullWidthSection';

const styles = {
  footer: {
    backgroundColor: grey900,
    textAlign: 'center',
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
  iconButton: {
    color: darkWhite,
  },
};

class Footer extends Component {
  render() {
    return (
      <FullWidthSection style={styles.footer}>
        <p style={styles.p}>
          This App is developed by uraway
        </p>
        <IconButton
          iconStyle={styles.iconButton}
          iconClassName="muidocs-icon-custom-github"
          href="https://github.com/uraway"
        />
      </FullWidthSection>
    );
  }
}

export default Footer;
