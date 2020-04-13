import React from 'react';
import { Favorite } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import propTypes from 'prop-types';

const useStyles = makeStyles({
  iconBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#E6E6E6',
    cursor: 'pointer',
    outline: 0,
    userSelect: 'none',
  },
  basic: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  active: {
    color: 'rgba(188, 37, 37, 0.5)',
  },
});

function FavoriteButton({ active, onClick }) {
  const classes = useStyles();

  return (
    <Box className={classes.iconBox} onClick={onClick}>
      <Favorite className={active ? classes.active : classes.basic} />
    </Box>
  );
}

FavoriteButton.propTypes = {
  active: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
};

export default FavoriteButton;
