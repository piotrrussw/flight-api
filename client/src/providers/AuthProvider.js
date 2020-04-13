import React, { createContext, useEffect, useReducer } from 'react';
import api, { getAuthToken, removeAuthToken } from 'api';

const initialState = {
  token: null,
  user: null,
};

function init() {
  return { ...initialState, token: getAuthToken() };
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT': {
      return initialState;
    }
    case 'SET_USER':
      return { ...state, user: action.payload.user };
    case 'UPDATE_AVATAR': {
      const user = { ...state.user, avatarUrl: action.payload.avatarUrl };
      return { ...state, user };
    }
    default:
      return state;
  }
}

const AuthContext = createContext(null);

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const getUserData = async () => {
    if (state.token) {
      try {
        const { data } = await api(state.token).get('/account');

        dispatch({ type: 'SET_USER', payload: { user: data.user } });
      } catch (e) {
        removeAuthToken();
        dispatch({ type: 'LOGOUT' });
        window.location = '/';
      }
    }
  };
  const onMount = () => {
    getUserData();
  };

  useEffect(onMount, []);

  return <AuthContext.Provider value={{ state, dispatch }} {...props} />;
};

export { AuthContext };
export default AuthProvider;
