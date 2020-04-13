import React from 'react';
import background from 'assets/images/home-main-bg.png';
import airbus from 'assets/images/airbus.png';
import { Button, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    height: '100%',
    width: '100vw',
  },
  mainSection: {
    display: 'flex',
    height: '60%',
  },
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: '60%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: '1',
    width: '100%',
  },
  header: {
    letterSpacing: '0.48px',
    color: '#ffffffde',
    fontSize: '3rem',
    fontWeight: 'normal',
    padding: '1rem 2rem 0 2rem',
  },
  planeImage: {
    width: '100%',
    maxWidth: '30rem',

    [theme.breakpoints.up('sm')]: {
      marginTop: '3rem',
    },
  },
  controlSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
    padding: '0 5rem',
  },
  signUp: {
    zIndex: 2,
    maxWidth: '30rem',
  },
  signIn: {
    maxWidth: '30rem',
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.mainSection}>
        <img src={background} alt="background" className={classes.bgImage} />
        <Box className={classes.content}>
          <Typography component="h1" className={classes.header}>
            Collect your Flights
          </Typography>
          <img
            className={classes.planeImage}
            src={airbus}
            alt="plane - airbus"
          />
        </Box>
      </Box>

      <Box className={classes.controlSection}>
        <Box component="span" mt={1} mb={2} width={1} align="center">
          <Button
            className={classes.signUp}
            component={RouterLink}
            to="/sign-up"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Sign up
          </Button>
        </Box>

        <Box component="span" mt={1} mb={2} width={1} align="center">
          <Button
            className={classes.signIn}
            component={RouterLink}
            to="/login"
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
