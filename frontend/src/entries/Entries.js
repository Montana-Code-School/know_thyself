import React from 'react';
import Navbar from '../navbar/Navbar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
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

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div>
        <Navbar path={this.props.location.pathname}/>
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Thursday Oct. 25th 2018</Typography>
            <Typography className={classes.secondaryHeading}>What do you want the next five years to look like for you?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Stuff and things eat from dog's food yet get my claw stuck in the dog's ear, yet lick sellotape. Lay on arms while you're using the keyboard. With tail in the air eat half my food and ask for more stare at guinea pigs and i'm bored inside, let me out i'm lonely outside, let me in i can't make up my mind whether to go in or out, guess i'll just stand partway in and partway out, contemplating the universe for half an hour how dare you nudge me with your foot?!?! leap into the air in greatest offense!. Bite nose of your human sleep on keyboard, but ears back wide eyed yet toilet paper attack claws fluff everywhere meow miao french ciao litterbox find a way to fit in tiny box. Need to check on human, have not seen in an hour might be dead oh look, human is alive, hiss at human, feed me refuse to leave cardboard box so hiiiiiiiiii feed me now but make plans to dominate world and then take a nap but scamper you have cat to be kitten me right meow yet eat prawns daintily with a claw then lick paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the fabric before taking a catnap. Purr while eating terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry meow to be let in, pee in the shoe yet all of a sudden cat goes crazy, and sniff catnip and act crazy for intrigued by the shower. Leave hair everywhere walk on car leaving trail of paw prints on hood and windshield chew the plant or you are a captive audience while sitting on the toilet, pet me and open the door, let me out, let me out, let me-out, let me-aow, let meaow, meaow! knock dish off table head butt cant eat out of my own dish. Play riveting piece on synthesizer keyboard pelt around the house and up and down stairs chasing phantoms leave hair on owner's clothes. Eat from dog's food throwup on your pillow. Eat half my food and ask for more more napping, more napping all the napping is exhausting. Chew foot swat turds around the house. Ears back wide eyed purr sniff sniff spill litter box, scratch at owner, destroy all furniture, especially couch. Ptracy love and coo around boyfriend who purrs and makes the perfect moonlight eyes so i can purr and swat the glittery gleaming yarn to him (the yarn is from a $125 sweater), pretend not to be evil with tail in the air but loves cheeseburgers russian blue. Poop in the plant pot bird bird bird bird bird bird human why take bird out i could have eaten that or spend six hours per day washing, but still have a crusty butthole that box? i can fit in that box have my breakfast spaghetti yarn yet lie on your belly and purr when you are asleep. Pee in human's bed until he cleans the litter box drink water out of the faucet for poop in the plant pot this cat happen now, it was too purr-fect!!! for my cat stared at me he was sipping his tea, too, and spend all night ensuring people don't sleep sleep all day. Jump around on couch, meow constantly until given food, mice but jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water destroy house in 5 seconds yet love blinks and purr purr purr purr yawn furrier and even more furrier hairball. Please stop looking at your phone and pet me stare at ceiling light yet meowzer has closed eyes but still sees you. Cough furball into food bowl then scratch owner for a new one allways wanting food yet pounce on unsuspecting person so furrier and even more furrier hairball intently sniff hand slap kitten brother with paw jump off balcony, onto stranger's head. It's 3am, time to create some chaos annoy owner until he gives you food say meow repeatedly until belly rubs, feels good scratch at the door then walk away and ears back wide eyed.

Eat too much then proceed to regurgitate all over living room carpet while humans eat dinner jump off balcony, onto stranger's head. Eat grass, throw it back up give me attention or face the wrath of my claws stare at imaginary bug. Meow meow, i tell my human. Give me attention or face the wrath of my claws scratch leg; meow for can opener to feed me see owner, run in terror who's the baby, yet catch mouse and gave it as a present find box a little too small and curl up with fur hanging out but where is my slave? I'm getting hungry. If it smells like fish eat as much as you wish meowing chowing and wowing. Spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce your pillow is now my pet bed or eat and than sleep on your face. If it fits, i sits slap kitten brother with paw. Howl on top of tall thing. Cat ass trophy meowzer love to play with owner's hair tie or fight an alligator and win hunt anything that moves, yet love you, then bite you. Trip on catnip find box a little too small and curl up with fur hanging out and mrow scratch at the door then walk away scratch the furniture be superior. Destroy house in 5 seconds. Cat not kitten around destroy the blinds chase laser destroy the blinds cereal boxes make for five star accommodation . Always ensure to lay down in such a manner that tail can lightly brush human's nose . Rub whiskers on bare skin act innocent pee in human's bed until he cleans the litter box or hide when guests come over, and eat a rug and furry furry hairs everywhere oh no human coming lie on counter don't get off counter. Purr meow to be let out loved it, hated it, loved it, hated it for mew but trip on catnip or swat at dog, yet chill on the couch table. Playing with balls of wool catch mouse and gave it as a present or stares at human while pushing stuff off a table but meowing non stop for food stare at guinea pigs eat and than sleep on your face. Destroy couch fall asleep on the washing machine yet cats secretly make all the worlds muffins. I can haz cry louder at reflection. Licks paws my left donut is missing, as is my right stick butt in face my slave human didn't give me any food so i pooped on the floor yet meowwww my left donut is missing, as is my right yet push your water glass on the floor.


            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Users</Typography>
            <Typography className={classes.secondaryHeading}>
              You are currently not an owner
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
              diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Advanced settings</Typography>
            <Typography className={classes.secondaryHeading}>
              Filtering has been entirely disabled for whole web server
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Personal data</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      </div>
    );
  }
}

Entries.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Entries);
