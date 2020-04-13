import React from 'react';
import propTypes from 'prop-types';
import { Box } from '@material-ui/core';
import useAuthContext from 'hooks/useAuthContext';
import TopBar from 'components/TopBar';
import NavigationBar from 'components/NavigationBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },

  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '1rem 2rem',
    maxHeight: 'calc(100% - 134px)',
  },
});

function Layout({ children }) {
  const { state } = useAuthContext();
  const authenticated = state.token;
  const classes = useStyles();
  const childrenClass = authenticated ? classes.contentBox : undefined;

  return (
    <Box className={classes.root}>
      {authenticated && <TopBar />}
      <Box className={childrenClass}>{children}</Box>
      {authenticated && <NavigationBar />}
    </Box>
  );
}

Layout.propTypes = {
  children: propTypes.element.isRequired,
};

export default Layout;
