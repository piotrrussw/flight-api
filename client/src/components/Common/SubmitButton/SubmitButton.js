import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  progress: {
    color: '#fff',
  },
});

function SubmitButton({ children, pending, ...rest }) {
  const classes = useStyles();

  return (
    <Button {...rest}>
      {pending ? (
        <CircularProgress className={classes.progress} size={32} />
      ) : (
        children
      )}
    </Button>
  );
}

SubmitButton.propTypes = {
  children: propTypes.node.isRequired,
  pending: propTypes.bool.isRequired,
  rest: propTypes.object,
};

export default SubmitButton;
