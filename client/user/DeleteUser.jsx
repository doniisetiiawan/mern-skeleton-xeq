import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { Delete as DeleteIcon } from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { remove } from './api-user';
import auth from '../auth/auth-helper';

class DeleteUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      open: false,
    };
  }

  clickButton = () => {
    this.setState({ open: true });
  };

  deleteAccount = () => {
    const jwt = auth.isAuthenticated();
    remove(
      {
        userId: this.props.userId,
      },
      { t: jwt.token },
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        auth.signout(() => console.log('deleted'));
        this.setState({ redirect: true });
      }
    });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <span>
          <IconButton
            aria-label="Delete"
            onClick={this.clickButton}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
          <Dialog
            open={this.state.open}
            onClose={this.handleRequestClose}
          >
            <DialogTitle>Delete Account</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Confirm to delete your account.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleRequestClose}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={this.deleteAccount}
                color="secondary"
                autoFocus="autoFocus"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </span>
      </>
    );
  }
}

export default DeleteUser;
