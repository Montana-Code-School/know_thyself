import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, IconButton, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
<<<<<<< HEAD
import Grid from '@material-ui/core/Grid'
import Time from '../time/Time';
import Weather from '../weather/Weather';
import './navbar.css'
=======
import Time from '../time/Time'
import Weather from '../weather/Weather'
import './Navbar.css'
>>>>>>> 07cd3c53a4f4faad8e2312bb62a40069cea3b34d

const styles = {
  root: {
    flexGrow: 1,

  },
  
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
<<<<<<< HEAD
  },

=======
  }
>>>>>>> 07cd3c53a4f4faad8e2312bb62a40069cea3b34d
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
<<<<<<< HEAD
      <AppBar position="static">
        <Toolbar className='toolbar' variant="regular">

          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" color="inherit">
            Know Thyself
          </Typography>

          <Grid
            container
            direction="column"
            justify="flex-end"
            alignItems="flex-end">
            <Time />
            <Weather />
          </Grid>

=======
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
>>>>>>> 07cd3c53a4f4faad8e2312bb62a40069cea3b34d
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
