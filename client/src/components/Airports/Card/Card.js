import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import FavoriteButton from 'components/Common/FavoriteButton';
import propTypes from 'prop-types';
import { LocalAirport } from '@material-ui/icons';
import api from 'api';
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
    marginTop: '8px',
  },
});

function AirportCard({ item, deletable, onDeleted }) {
  const [airport, setAirport] = useState(item);
  const {
    state: { token },
  } = useAuthContext();
  const [favoriteAlert, setFavoriteAlert] = useState(false);
  const classes = useStyles();

  const toggleFavorites = async () => {
    try {
      const { data } = airport.favorite
        ? await api(token).delete(`/user/airport/${airport._id}`)
        : await api(token).post('/airport/save', airport);

      const newAirport = data && data.airport ? data.airport : {};

      if (airport.favorite && typeof onDeleted === 'function') {
        onDeleted(airport._id);
      } else {
        setAirport({ ...airport, ...newAirport, favorite: !airport.favorite });
      }
    } catch (e) {
      setFavoriteAlert(true);
    }
  };

  const closeAlert = () => setFavoriteAlert(false);
  const deleted = deletable && !airport.favorite;

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
                {airport.CountryName}
              </Typography>

              <FavoriteButton
                active={airport.favorite}
                onClick={toggleFavorites}
              />
            </Box>
            <Typography variant="h5" component="h2">
              {airport.PlaceName}
            </Typography>
            <Chip
              size="small"
              className={classes.chip}
              label={airport.PlaceId}
              icon={<LocalAirport />}
            />
          </CardContent>
        </Card>

        <Snackbar
          open={favoriteAlert}
          autoHideDuration={3000}
          onClose={closeAlert}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity="error" onClose={closeAlert}>
            Unable to add airport to favorites, please try again!
          </Alert>
        </Snackbar>
      </>
    )
  );
}

AirportCard.propTypes = {
  item: propTypes.object.isRequired,
  deletable: propTypes.bool,
  onDeleted: propTypes.func,
};

AirportCard.defaultProps = {
  deletable: false,
  onDeleted: undefined,
};

export default AirportCard;
