import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import propTypes from 'prop-types';
import useAuthContext from 'hooks/useAuthContext';
import api from 'api';

function DeleteAvatarDialog({ open, handleClose }) {
  const {
    state: { token },
    dispatch,
  } = useAuthContext();

  const confirmDeleteAvatar = async () => {
    api(token)
      .delete('/user/avatar')
      .finally(() => {
        dispatch({ type: 'UPDATE_AVATAR', payload: { avatarUrl: null } });
        handleClose();
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
          This will pernamently delete your saved avatar.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={confirmDeleteAvatar} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteAvatarDialog.propTypes = {
  open: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
};

export default DeleteAvatarDialog;
