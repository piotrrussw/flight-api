import useAuthContext from 'hooks/useAuthContext';
import { Redirect, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import React from 'react';

function PublicRoute({ component: Component, ...props }) {
  const { state } = useAuthContext();

  return (
    <Route
      {...props}
      render={(renderProps) => (!state.token ? <Component {...renderProps} /> : <Redirect to="/flights" />)}
    />
  );
}

PublicRoute.propTypes = {
  component: propTypes.func.isRequired,
};

export default PublicRoute;
