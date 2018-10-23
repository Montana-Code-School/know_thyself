import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, IconButton, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Time from '../time/Time'
import Weather from '../weather/Weather'
import './Navbar.css'

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  }
};

/*
font-family: 'Playfair Display', serif; 3
font-family: 'Amatic SC', cursive; 3.5
font-family: 'Vollkorn', serif; 3
font-family: 'Old Standard TT', serif; blergh
font-family: 'K2D', sans-serif; 5:10
font-family: 'Satisfy', cursive; 5:10
*/

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar className="toolbar" variant="dense">
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography style={{fontFamily: "'Satisfy', cursive", color: "#E7DFDD"}} variant="h4">
            Know Thyself
          </Typography>
          <div style={{flex: "1", alignItems: "flex-end", flexDirection: "column", display: "flex"}}>
            <Time />
            <Weather />

          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
