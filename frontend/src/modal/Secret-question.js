import React, { Component } from 'react';
import  {Button, Input, Modal, Typography} from '@material-ui/core';
import styles from './Secret-styles'

class SecretModal extends Component{

  render() {
    return (
      <Modal
        style={styles.modalCard}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.props.close}
        disableAutoFocus={true}
      >
        <div>
          <Input
            className="secret"
            placeholder=" What's your favorite color?"
            name="secret"
            type="text"
            onChange={this.props.change}
            style={styles.secret}
          />
          <br></br>
          <br></br>
          <Button
            className="secretSubmit"
            value="Login"
            type="submit"
            style={styles.secretSubmit}
            onClick={this.props.signup}
          >Submit</Button>
          <Typography variant="h6" id="modal-title" style={{color:'white', font:'K2D', textAlign:'center'}}>
            The answer to this question is your secret passphrase.
            Please keep a record of it, in case you need to reset your password.
          </Typography>
        </div>
      </Modal>
    );
  }
}

export default SecretModal;
