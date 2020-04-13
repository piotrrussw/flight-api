import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import propTypes from 'prop-types';
import api from 'api';
import useAuthContext from 'hooks/useAuthContext';

function DeleteAccountDialog({ open, handleClose }) {
  const history = useHistory();
  const {
    state: { token },
    dispatch,
  } = useAuthContext();

  const confirmDeleteAccount = () => {
    api(token)
      .get('/account/delete')
      .finally(() => {
        dispatch({ type: 'LOGOUT' });
        handleClose();
        history.push('/');
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Deleting your account is permanent and will remove all content
          including favorites, avatars and profile settings. Are you sure you
          want to delete your account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={confirmDeleteAccount} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteAccountDialog.propTypes = {
  open: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
};

export default DeleteAccountDialog;
