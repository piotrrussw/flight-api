import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from '@material-ui/core';
import Avatar from 'components/Common/Avatar';
import useAuthContext from 'hooks/useAuthContext';
import DeleteAccountDialog from 'components/Profile/DeleteAccountDialog';
import ChangeAvatarDialog from 'components/Profile/ChangeAvatarDialog';
import api, { removeAuthToken } from 'api';
import DeleteAvatarDialog from 'components/Profile/DeleteAvatarDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '3rem 0 1.5rem 0',
    height: '100%',
  },
  avatarBox: {
    width: '8rem',
    height: '8rem',
  },
  list: {
    marginTop: '5rem',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  username: {
    textAlign: 'center',
    margin: '1rem 0',
    fontSize: '1.25rem',
  },
  actionBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    maxWidth: '30rem',
  },
  logoutItem: {
    color: theme.palette.error.main,
  },
  deleteItem: {
    color: theme.palette.error.main,
    textAlign: 'center',
  },
  deleteAvatarItem: {
    color: theme.palette.error.main,
  },
}));

function Profile() {
  const [avatarDialogVisible, setAvatarDialogVisible] = useState(false);
  const [avatarDeleteDialogVisible, setAvatarDeleteDialogVisible] = useState(
    false,
  );
  const [deleteAccountDialogVisible, setDeleteAccountDialogVisible] = useState(
    false,
  );
  const classes = useStyles();
  const history = useHistory();
  const {
    state: { user, token },
    dispatch,
  } = useAuthContext();

  const logOut = () => {
    api(token)
      .get('/logout')
      .finally(() => {
        removeAuthToken();
        dispatch({ type: 'LOGOUT' });
        history.push('/');
      });
  };

  const hasAvatar = user && user.avatarUrl;

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.avatarBox}>
          <Avatar src={user && user.avatarUrl} />
          <Typography component="h5" className={classes.username} gutterBottom>
            {user && user.username}
          </Typography>
        </Box>
        <Box className={classes.actionBox}>
          <List
            className={classes.list}
            component="nav"
            aria-label="secondary mailbox folders"
          >
            <ListItem button onClick={() => setAvatarDialogVisible(true)}>
              <ListItemText
                primary={hasAvatar ? 'Change avatar' : 'Upload avatar'}
              />
            </ListItem>
            <Divider />

            {hasAvatar && (
              <>
                <ListItem
                  className={classes.deleteAvatarItem}
                  button
                  onClick={() => setAvatarDeleteDialogVisible(true)}
                >
                  <ListItemText primary="Delete avatar" />
                </ListItem>
                <Divider />
              </>
            )}

            <ListItem className={classes.logoutItem} button onClick={logOut}>
              <ListItemText primary="Log out" />
            </ListItem>
            <Divider />
          </List>

          <Typography
            className={classes.deleteItem}
            component="div"
            gutterBottom
            onClick={() => setDeleteAccountDialogVisible(true)}
          >
            Delete account
          </Typography>
        </Box>
      </Box>

      <DeleteAccountDialog
        handleClose={() => setDeleteAccountDialogVisible(false)}
        open={deleteAccountDialogVisible}
      />

      <ChangeAvatarDialog
        handleClose={() => setAvatarDialogVisible(false)}
        open={avatarDialogVisible}
      />

      <DeleteAvatarDialog
        handleClose={() => setAvatarDeleteDialogVisible(false)}
        open={avatarDeleteDialogVisible}
      />
    </>
  );
}

export default Profile;
