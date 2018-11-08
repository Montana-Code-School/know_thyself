import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {AppBar, Toolbar, Typography, IconButton, Drawer, Divider, List, ListItem, ListItemText, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Time from '../time/Time'
import Weather from '../weather/Weather'
import styles from './NavStyles'
<<<<<<< HEAD
=======

>>>>>>> af0c5b03b6a7c3e868854cc2b64e0d94bc5f7595

class NavBar extends React.Component {
  state = {
    open: false,
    atprofile: false,
    atentries: false,
    athabits: false,
    attodo: false
  };

  static propTypes = {
      location: PropTypes.object.isRequired
    }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  revealProfile = () => {
    this.setState({atprofile: true});
  };

  revealEntry = () => {
    this.setState({atentries: true});
  };

  revealHabits = () => {
    this.setState({athabits: true});
  };

  revealTodo = () => {
    this.setState({attodo: true});
  }

  revealProfile = () => {
    this.setState({atprofile: true});
  };

  revealEntry = () => {
    this.setState({atentries: true});
  };

  revealHabits = () => {
    this.setState({athabits: true});
  };

  render() {
    const { classes, path } = this.props;
    const { open } = this.state;
    if (path !== '/profile' && this.state.atprofile) {
      return <Redirect push to="/profile" />;
    }
    if (path !== '/entries' && this.state.atentries) {
      return <Redirect push to="/entries" />;
    }
    if (path !== '/habits' && this.state.athabits) {
     return <Redirect push to="/habits" />;
    }
    return (
      <div >
        <AppBar
          position="static"
          className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
          })}>
<<<<<<< HEAD
          <Toolbar className="toolbar" variant="dense" style={{backgroundColor: '#373737' }} isableGutters={!open}>
=======
          <Toolbar
            className="toolbar"
            variant="dense"
            style={{backgroundColor: '#373737' }}
            disableGutters={!open}>
>>>>>>> af0c5b03b6a7c3e868854cc2b64e0d94bc5f7595
            <IconButton
              className={classNames(classes.menuButton, open && classes.hide)}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
<<<<<<< HEAD
            <Typography noWrap className='' style={{fontFamily: "'Satisfy', cursive", color: "#E7DFDD"}} variant="h4">
              Know Thyself
            </Typography>
            <div className='timeweather' style={{flex: "1", alignItems: "flex-end", flexDirection: "column", display: "flex"}}>
=======
            <Typography
              noWrap className='ct1'
              style={{fontFamily:"Satisfy, cursive", color: "#E7DFDD"}}
              variant="h4">
              Know Thyself
            </Typography>
            <div className='timeweather'
              style={{flex: "1", alignItems: "flex-end", flexDirection: "column", display: "flex"}}>
>>>>>>> af0c5b03b6a7c3e868854cc2b64e0d94bc5f7595
              <Time />
              <Weather />
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          className="drawer"
          >
          <div className={classes.drawerHeader}>
            <List>
              <ListItem>
                <ListItemText>Know Thy Options</ListItemText>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </ListItem>
            </List>
          </div>
          <Divider />
          <List>
            <ListItem>
              <Button onClick={this.revealProfile}>Profile</Button>
            </ListItem>
            <ListItem>
              <Button onClick={this.revealEntry}>Entries</Button>
            </ListItem>
            <ListItem>
              <Button onClick={this.revealHabits}>Habits</Button>
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
