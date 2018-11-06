import React, { Component } from 'react';
import  {Button, Input, Modal, Typography} from '@material-ui/core';
import styles from './Password-styles'

class PasswordModal extends Component{

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
            className="email"
            placeholder=" Email"
            name="email"
            type="text"
            onChange={this.props.change}
            style={styles.email}
          />
          <Input
            className="secret"
            placeholder=" Secret"
            name="secret"
            type="text"
            onChange={this.props.change}
            style={styles.secret}
          />
          <Input
            className="password"
            placeholder=" New Password"
            name="password"
            type="text"
            onChange={this.props.change}
            style={styles.password}
          />
          <br></br>
          <br></br>
          <Button
            className="passwordSubmit"
            value="password-submit"
            type="submit"
            onClick={this.props.changepassword}
            style={styles.passwordSubmit}
          >Submit</Button>
          <Typography
            className="secretHint"
            variant="h6"
            id="modal-title"
            style={styles.secretHint}>
            Secret Hint, Favorite Color.
          </Typography>
        </div>
      </Modal>
    );
  }
}

export default PasswordModal;
