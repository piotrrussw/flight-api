import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import propTypes from 'prop-types';
import ImageUpload from 'components/Common/ImageUpload';
import useAuthContext from 'hooks/useAuthContext';

const useStyles = makeStyles({
  dialogContent: {
    minWidth: '16rem',
    minHeight: '10rem',
  },
});

function ChangeAvatarDialog({ open, handleClose }) {
  const classes = useStyles();
  const { dispatch } = useAuthContext();
  const handleOnLoaded = (avatarUrl) => {
    dispatch({ type: 'UPDATE_AVATAR', payload: { avatarUrl } });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="avatar-dialog-title"
    >
      <DialogTitle id="avatar-dialog-title">Upload avatar</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <ImageUpload onLoaded={handleOnLoaded} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ChangeAvatarDialog.propTypes = {
  open: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
};

export default ChangeAvatarDialog;
