import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import propTypes from 'prop-types';
import placeholder from 'assets/images/avatar-placeholder.png';
import { baseURL } from 'api';

const useStyles = makeStyles({
  image: {
    maxHeight: 'calc(100% - 0.25rem)',
    maxWidth: 'calc(100% - 0.25rem)',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: '0.125rem solid',
    borderColor: '#6200ee',
  },
});

function Avatar({ src, redirect }) {
  const classes = useStyles();
  const avatarSrc = src ? `${baseURL}/${src}` : placeholder;

  return (
    <RouterLink to={redirect ? '/profile' : '#'}>
      <img className={classes.image} src={avatarSrc} alt="avatar" />
    </RouterLink>
  );
}

Avatar.propTypes = {
  src: propTypes.string,
  redirect: propTypes.bool,
};

Avatar.defaultProps = {
  redirect: true,
};

export default Avatar;
