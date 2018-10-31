import React from 'react';
import Navbar from '../navbar/Navbar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import HtmlComponent from '../parser/HTMLparser'
//entries get fetched within profile.js
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})
const styles = theme => ({
  root: {
    margin: '5% 12% 0 12%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class Entries extends React.Component {
  state = {
    expanded: null,
  };

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
        <Navbar path={this.props.location.pathname} theme={theme}/>
      <div className={classes.root}>
        {this.props.entries.map(entry =>
          <ExpansionPanel key={entry._id} expanded={expanded === entry._id} onChange={this.handleChange(entry._id)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{entry.createdAt}</Typography>
              <Typography className={classes.secondaryHeading}>{entry.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <HtmlComponent entry={entry.body}/>
              </Typography>
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
