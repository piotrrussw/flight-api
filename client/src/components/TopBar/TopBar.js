import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Box } from '@material-ui/core';
import useSessionContext from 'hooks/useSessionContext';
import { ArrowBack } from '@material-ui/icons';
import Avatar from 'components/Common/Avatar';
import useAuthContext from 'hooks/useAuthContext';

function TopBar() {
  const { sessionData } = useSessionContext();
  const history = useHistory();
  const {
    state: { user },
  } = useAuthContext();
  const pageTitle = sessionData.activePage.title;

  return (
    <AppBar position="static" color="transparent">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={1}
      >
        <Box display="flex" alignItems="center">
          <ArrowBack color="action" onClick={() => history.goBack()} />
          <Box fontSize="large" pl={3}>
            {pageTitle}
          </Box>
        </Box>
        <Box width="2rem" height="2rem">
          <Avatar src={user && user.avatarUrl} />
        </Box>
      </Box>
    </AppBar>
  );
}

export default TopBar;
