import React, { useState } from 'react';
import {
  Box,
  CardContent,
  Chip,
  Typography,
  Card,
  Snackbar,
} from '@material-ui/core';
import FavoriteButton from 'components/Common/FavoriteButton';
import {
  LocalOffer,
  ArrowRightAlt,
  Event,
  AccessTime,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import api from 'api';
import { Alert } from '@material-ui/lab';
import useAuthContext from 'hooks/useAuthContext';

const useStyles = makeStyles({
  root: {
    width: '100%',
    boxShadow: '0px 1px 3px #00000033',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  title: {
    fontSize: 14,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chip: {
    padding: '0.1rem 0.5rem',
    backgroundColor: '#D6C4F9',
    color: '#6100ED',
  },
  offerColor: {
    color: '#6100ED',
  },
  iconArrow: {
    color: '#7E7E7E',
    padding: '0 0.25rem',
  },
  directionBox: {
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 0',
  },
  dateContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  dateBox: {
    display: 'flex',
    alignItems: 'center',
    opacity: 0.5,
  },
  timeBox: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '1rem',
    opacity: 0.5,
  },
  iconDate: {
    paddingRight: '0.25rem',
  },
  iconTime: {
    paddingRight: '0.25rem',
  },
});

function FlightCard({ item, deletable, onDeleted }) {
  const {
    state: { token },
  } = useAuthContext();
  const [flight, setFlight] = useState(item);
  const [favoriteAlert, setFavoriteAlert] = useState(false);
  const classes = useStyles();

  const closeAlert = () => setFavoriteAlert(false);

  const toggleFavorites = async () => {
    try {
      const { data } = flight.favorite
        ? await api(token).delete(`/user/flight/${flight._id}`)
        : await api(token).post('/flight/save', flight);

      const newFlight = data && data.flight ? data.flight : {};

      if (flight.favorite && typeof onDeleted === 'function') {
        onDeleted(flight._id);
      } else {
        setFlight({ ...flight, ...newFlight, favorite: !flight.favorite });
      }
    } catch (e) {
      setFavoriteAlert(true);
    }
  };

  const deleted = deletable && !flight.favorite;

  return (
    !deleted && (
      <>
        <Card className={classes.root}>
          <CardContent>
            <Box className={classes.headerContainer}>
              <Typography
                component="div"
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                <Chip
                  className={classes.chip}
                  label={`${flight.price} PLN`}
                  icon={<LocalOffer className={classes.offerColor} />}
                />
              </Typography>

              <FavoriteButton
                active={flight.favorite}
                onClick={toggleFavorites}
              />
            </Box>
            <Typography
              className={classes.directionBox}
              variant="h5"
              component="h2"
            >
              {flight.origin}
              <ArrowRightAlt className={classes.iconArrow} />
              {flight.destination}
            </Typography>
            <Box className={classes.dateContainer}>
              <Box className={classes.dateBox}>
                <Event className={classes.iconDate} />
                {flight.dateTime[0]}
              </Box>
              <Box className={classes.timeBox}>
                <AccessTime className={classes.iconTime} />
                {flight.dateTime[1]}
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Snackbar
          open={favoriteAlert}
          autoHideDuration={3000}
          onClose={closeAlert}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity="error" onClose={closeAlert}>
            Unable to add flight to favorites, please try again!
          </Alert>
        </Snackbar>
      </>
    )
  );
}

FlightCard.propTypes = {
  item: propTypes.object.isRequired,
  deletable: propTypes.bool,
  onDeleted: propTypes.func,
};

FlightCard.defaultProps = {
  deletable: false,
  onDeleted: undefined,
};

export default FlightCard;
