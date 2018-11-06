import React, { Component } from 'react';
import Storage from '../storage';
import { Redirect } from 'react-router-dom';
import  {Button, Input, Modal, Typography, Card, CardContent} from '@material-ui/core';


const styles = {
  modalCard: {
    width: '33%',
    height: '44%',
    margin: 'auto',
    backgroundColor: 'white',
    border: 'solid 3px black'
  }
}

class SecretModal extends Component{


    render() {
      return (
        <Modal
          style={styles.modalCard}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          // onClose={this.handleClose}
        >
          <div>
            <Input
              className="secret"
              placeholder="What's your favorite color?"
              name="secret"
              type="text"
              onChange={this.props.change}
            />
            <Button
              className="secret-submit"
              value="Login"
              type="submit"
              style={{height: '40px', width: '80px', marginLeft: '10%', font:'K2D', backgroundColor:'grey', color:'white', marginBottom: '10px', fontSize: '12px'}}
              onClick={this.props.signup}
            >Submit</Button>
            <Typography variant="h6" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </div>
        </Modal>
      );
    }
  }


export default SecretModal;
