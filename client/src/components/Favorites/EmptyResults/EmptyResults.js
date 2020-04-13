import React from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import { SentimentVeryDissatisfied } from '@material-ui/icons';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  emptyBox: {
    margin: '1rem 0',
    textAlign: 'center',
  },
  sadIcon: {
    width: '10rem',
    height: '10rem',
    color: '#7F7F7F',
    opacity: 0.8,
  },
  text: {
    margin: '1rem 0 2rem 0',
  },
});

function EmptyResults({ type }) {
  const history = useHistory();
  const classes = useStyles();
  const buttonText = {
    flights: 'Explore flights',
    airports: 'Explore airports',
  };
  const text = {
    flights:
      'You don’t have favorite flights yet. Explore flights and click on a star to keep your flights',
    airports:
      'You don’t have favorite airports yet. Explore flights and click on a star to keep your flights',
  };

  const handleExplore = () => {
    history.push(`/${type}`);
  };

  return (
    <Box className={classes.emptyBox}>
      <SentimentVeryDissatisfied className={classes.sadIcon} />
      <Typography className={classes.text}>{text[type]}</Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleExplore}
      >
        {buttonText[type]}
      </Button>
    </Box>
  );
}

EmptyResults.propTypes = {
  type: propTypes.string.isRequired,
};

export default EmptyResults;
