import React, { useEffect, useReducer } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
} from '@material-ui/core';
import { SentimentVeryDissatisfied } from '@material-ui/icons';
import List from 'components/Common/List';
import FlightCard from 'components/Flights/Card';
import api from 'api';
import { getIsoToday } from 'utils/date';
import useAuthContext from 'hooks/useAuthContext';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '0.5rem 0 1rem 0',
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  emptyBox: {
    margin: '1rem 0',
    textAlign: 'center',
  },
  originBox: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  sadIcon: {
    width: '10rem',
    height: '10rem',
    color: '#7F7F7F',
    opacity: 0.8,
  },
}));

const initialState = {
  origin: '',
  destination: '',
  flights: [],
  places: [],
  pending: false,
  error: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DESTINATION':
      return { ...state, destination: action.payload.destination };
    case 'SET_ORIGIN':
      return { ...state, origin: action.payload.origin };
    case 'FETCH_FLIGHTS':
      return {
        ...state,
        pending: true,
        error: false,
      };
    case 'FETCH_FLIGHTS_SUCCESS':
      return { ...state, pending: false, flights: action.payload.flights };
    case 'FETCH_FLIGHTS_FAILURE':
      return {
        ...state,
        pending: false,
        flights: [],
        error: true,
      };
    case 'FETCH_PLACES_SUCCESS':
      return {
        ...state,
        places: action.payload.places,
      };
    default:
      return state;
  }
}

function Flights() {
  const classes = useStyles();
  const {
    state: { token },
  } = useAuthContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOriginChange = (event) => {
    dispatch({ type: 'SET_ORIGIN', payload: { origin: event.target.value } });
  };

  const handleDestinationChange = (event) => {
    dispatch({
      type: 'SET_DESTINATION',
      payload: { destination: event.target.value },
    });
  };

  const fetchPlaces = () => {
    let mounted = true;
    const type = 'FETCH_PLACES';
    const callApi = async () => {
      try {
        const { data } = await api(token).get('/places');

        if (mounted) {
          dispatch({
            type: `${type}_SUCCESS`,
            payload: { places: data.places },
          });
        }
      } catch (e) {
        if (mounted) dispatch({ type: `${type}_FAILURE` });
      }
    };

    callApi();

    return () => {
      mounted = false;
    };
  };

  const fetchFlights = () => {
    let mounted = true;
    const type = 'FETCH_FLIGHTS';
    const callApi = async () => {
      try {
        const date = getIsoToday();
        const params = [state.destination, state.origin, date].join('/');
        const { data } = await api(token).get(`/flights?query=${params}`);
        const flights = data ? data.flights || [] : [];

        if (mounted) dispatch({ type: `${type}_SUCCESS`, payload: { flights } });
      } catch (e) {
        if (mounted) dispatch({ type: `${type}_FAILURE` });
      }
    };

    if (state.destination && state.origin && mounted) {
      dispatch({ type });
      callApi();
    }

    return () => {
      mounted = false;
    };
  };

  useEffect(fetchPlaces, []);
  useEffect(fetchFlights, [state.destination, state.origin]);

  const {
    origin, destination, pending, flights, places,
  } = state;
  const empty = origin && destination && !pending && !flights.length;
  const validParams = origin && destination;

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="origin-select">Origin Place</InputLabel>
        <Select
          native
          value={origin}
          onChange={handleOriginChange}
          inputProps={{
            name: 'Origin place',
            id: 'origin-select',
          }}
        >
          <option aria-label="None" value="" />
          {places.map(({ _id, placeId, name }) => (
            <option key={`origin-${_id}`} value={placeId}>
              {name}
              {' '}
              (
              {placeId}
              )
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="destination-select">Destination Place</InputLabel>
        <Select
          native
          value={destination}
          onChange={handleDestinationChange}
          inputProps={{
            name: 'Destination place',
            id: 'destination-select',
          }}
        >
          <option aria-label="None" value="" />
          {places.map(({ _id, placeId, name }) => (
            <option key={`destination-${_id}`} value={placeId}>
              {name}
              {' '}
              (
              {placeId}
              )
            </option>
          ))}
        </Select>
      </FormControl>

      {empty && (
        <Box className={classes.emptyBox}>
          <SentimentVeryDissatisfied className={classes.sadIcon} />
          <div>Nothing was found.</div>
          <div>Please, change search parameter</div>
        </Box>
      )}

      {!validParams && (
        <Box className={classes.originBox}>
          Choose origin and destination place to display flights
        </Box>
      )}

      <List items={flights} component={FlightCard} pending={pending} />
    </>
  );
}

export default Flights;
