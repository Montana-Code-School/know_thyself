import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid'
import Time from '../time/Time';
import Weather from '../weather/Weather';
import './navbar.css'

const styles = {
  root: {
    flexGrow: 1,

  },
  
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },

};

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
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

        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
