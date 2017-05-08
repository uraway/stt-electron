import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { spacing, typography, zIndex } from 'material-ui/styles';
import { purple900 } from 'material-ui/styles/colors';

const SelectableList = makeSelectable(List);

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: purple900,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8,
  },
};

export default class AppNavDrawer extends Component {

  static propTypes = {
    docked: PropTypes.bool.isRequired,
    onChangeList: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

  render() {
    const {
      docked,
      onChangeList,
      open,
    } = this.props;
    return (
      <Drawer
        docked={docked}
        open={open}
        containerStyle={{ zIndex: zIndex.drawer - 100 }}
      >
        <div style={styles.logo}>
          Material-UI
        </div>
        <SelectableList
          value={location.pathname}
          onChange={onChangeList}
        >
          <ListItem
            primaryText="Home"
            value="/"
          />
        </SelectableList>
      </Drawer>
    );
  }
}
