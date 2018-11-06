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

class PasswordModal extends Component{


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
              className="email"
              placeholder="email"
              name="email"
              type="text"
              onChange={this.props.change}
            />
            <Input
              className="secret"
              placeholder="what is your favorite color?"
              name="secret"
              type="text"
              onChange={this.props.change}
            />
            <Input
              className="new password"
              placeholder="new password"
              name="password"
              type="text"
              onChange={this.props.change}
            />
            <Button
              className="password-submit"
              value="password-submit"
              type="submit"
              onClick={this.props.changepassword}
              style={{height: '40px', width: '80px', marginLeft: '10%', font:'K2D', backgroundColor:'grey', color:'white', marginBottom: '10px', fontSize: '12px'}}
            >Submit</Button>
            <Typography variant="h6" id="modal-title">
              Forgot your password! No worries dawg.
            </Typography>
          </div>
        </Modal>
      );
    }
  }


export default PasswordModal;
