import React from 'react';
import Navbar from '../navbar/Navbar'
import PropTypes from 'prop-types';
import { withStyles,
        ExpansionPanel,
        ExpansionPanelDetails,
        ExpansionPanelSummary,
        Typography,
        createMuiTheme,
        MuiThemeProvider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HtmlComponent from '../parser/HTMLparser'
import Storage from '../storage'
import styles from './Entry-styles'

//entries get fetched within profile.js
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

class Entries extends React.Component {
  state = {
    expanded: null,
  };

  componentDidMount() {
    let routeUrl;
    if (process.env.NODE_ENV === 'development') {
      routeUrl = 'http://localhost:4001/verify/entry'
    } else {
      routeUrl = '/verify/entry'
    }
    fetch(routeUrl,
     {
        method: 'GET',
        headers: {
          'Content-type' : 'application/json',
          'Authorization' : `bearer ${Storage.getToken()}`
        }
      })
      .then((results) => results.json())
      .then(data => {
        this.props.fetchedEntries(data)
      })
      .catch((err) => console.log(err))
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  parseHTML(str) {
    let el = document.createElement( 'div' )
    el.innterHTML = str
    console.log(el)
    return el
  }

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <Navbar path={this.props.location.pathname}
                theme={theme}
                fetchedEntries={this.props.fetchedEntries}/>
      <div className={classes.root}>
        {this.props.entries.map(entry =>
          <ExpansionPanel
            style={styles.panel}
            key={entry._id}
            expanded={expanded === entry._id}
            onChange={this.handleChange(entry._id)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{entry.createdAt}
              </Typography>
              <Typography className={classes.secondaryHeading}>{entry.title}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <HtmlComponent entry={entry.body}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </div>
    </MuiThemeProvider>
    );
  }
}

Entries.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Entries);
