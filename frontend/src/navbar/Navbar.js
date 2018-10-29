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
import './Navbar.css'

const drawerWidth = 200;

const styles = theme => ({

typography: {
  useNextVariants: true
},
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
  overflow: 'hidden'
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
  }
  revealEntry = () => {
    // console.log(event.target)
    this.setState({atentries: true});
  }
  revealHabits = () => {
    this.setState({athabits: true});
  }
  revealTodo = () => {
    this.setState({attodo: true});
  }

  render() {
console.log(this.props.path)
    const { classes, entries, location, path } = this.props;
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
  if (path !== '/todo' &&this.state.attodo) {
  return <Redirect push to="/todo" />;
  }
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
          variant="persistent"
          anchor="left"
          open={open}
          className="drawer"
          >
          <div className={classes.drawerHeader}>
            <List>
              <ListItem>
                <ListItemText>Stuff</ListItemText>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </ListItem>
            </List>
          </div>
          <Divider />
          <List>
            <ListItem>
              <Button onClick={this.revealProfile} >Profile</Button>
            </ListItem>
            <ListItem>
              <Button onClick={this.revealEntry} >Entries</Button>
            </ListItem>
            <ListItem>
              <Button onClick={this.revealHabits} >Habits</Button>
            </ListItem>
            <ListItem>
              <Button onClick={this.revealTodo} >Todo</Button>
            </ListItem>
          </List>

              {/* <List>
                {entries.map(entry => (
                  <ListItem key={entry._id}>
                    <ListItemText style={{maxWidth:200, textOverflow:'ellipsis', whiteSpace:'nowrap', overflow: 'hidden'}} key={entry._id} onClick={(e) => this.revealEntry(e)} >{entry.createdAt}</ListItemText>
                  </ListItem>
                ))}
               </List> */}
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
