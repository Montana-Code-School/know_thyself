import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {AppBar, Toolbar, Typography, IconButton, Drawer, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Time from '../time/Time'
import Weather from '../weather/Weather'
import './Navbar.css'


const drawerWidth = 110;


const styles = theme => ({
paper: { },
root: {
  display: 'flex',
  flexGrow: 1
},
appBar: {
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
},
appBarShift: {
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: drawerWidth,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
},
menuButton: {
  marginLeft: 12,
  marginRight: 20,
},
hide: {
  display: 'none',
},
drawer: {
  width: drawerWidth,
  flexShrink: 0,
},
drawerPaper: {
  width: drawerWidth,
},
drawerHeader: {
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px',
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
},
content: {
  flexGrow: 1,
  padding: theme.spacing.unit * 3,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: -drawerWidth,
},
contentShift: {
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: 0,
  },
});



class NavBar extends React.Component {

  state = {
    open: false,
  };

  handleDrawerOpen = () => {
      console.log('it got clicked')

      this.setState({ open: true });
    };

    handleDrawerClose = () => {
      this.setState({ open: false });
    };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    console.log(this.props)
  return (
    <div >
      <AppBar position="static"
        className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
        <Toolbar className="toolbar" variant="dense" disableGutters={!open}>
          <IconButton
              className={classNames(classes.menuButton, open && classes.hide)}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography noWrap style={{fontFamily: "'Satisfy', cursive", color: "#E7DFDD"}} variant="h4">
            Know Thyself
          </Typography>
          <div style={{flex: "1", alignItems: "flex-end", flexDirection: "column", display: "flex"}}>
            <Time />
            <Weather />

          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className='drawer'
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
          }}>
            <div className={classes.drawerHeader}>
              <List>
                <ListItem>
                  <ListItemText>Recent User Entries</ListItemText>

              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
                </ListItem>
              </List>
            </div>
            <Divider />
              <List>
                <ListItem >
                  <ListItemText> </ListItemText>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem>
                  <ListItemText>-------Entry-------</ListItemText>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem>
                  <ListItemText>-------Entry-------</ListItemText>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem>
                  <ListItemText>-------Entry-------</ListItemText>
                </ListItem>
              </List>
      </Drawer>

    </div>
  );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
