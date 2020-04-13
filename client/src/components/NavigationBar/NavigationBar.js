import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import {
  Flight, LocationOn, Star, AccountCircle,
} from '@material-ui/icons';
import useSessionContext from 'hooks/useSessionContext';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

function NavigationBar() {
  const classes = useStyles();
  const {
    sessionData: {
      activePage: { value },
    },
  } = useSessionContext();

  return (
    <BottomNavigation className={classes.root} showLabels value={value}>
      <BottomNavigationAction
        label="Flights"
        value="flights"
        component={RouterLink}
        to="/flights"
        icon={<Flight />}
      />
      <BottomNavigationAction
        label="Airports"
        value="airports"
        component={RouterLink}
        to="/airports"
        icon={<LocationOn />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        component={RouterLink}
        to="/favorites"
        icon={<Star />}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        component={RouterLink}
        to="/profile"
        icon={<AccountCircle />}
      />
    </BottomNavigation>
  );
}

export default NavigationBar;
