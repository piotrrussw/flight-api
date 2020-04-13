import React, { useReducer } from 'react';
import ControlBox from 'components/Common/ControlBox';
import {
  Box,
  TextField,
  Link,
  Typography,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  FormGroup,
  OutlinedInput,
} from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { ArrowBack, Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import api, { setAuthToken } from 'api';
import SubmitButton from 'components/Common/SubmitButton';
import useAuthContext from 'hooks/useAuthContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    width: '100%',
    maxWidth: '30rem',
  },
  loginForm: {
    height: '100%',
    width: '100%',
  },
  header: {
    fontSize: '1.5rem',
    margin: '1rem 0',
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
  },
  backText: {
    textTransform: 'none',
    color: '#1258c7',
  },
  divided: {
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    flexGrow: 1,
    borderBottom: '1px solid #03dac6',
    margin: '5px',
  },
  text: {
    padding: '0 1rem',
    color: '#00000099',
    textTransform: 'uppercase',
    fontSize: '0.875rem',
  },
  errorBox: {
    height: '1rem',
    padding: '1rem 2rem',
    color: '#F22727',
  },
  formControl: {
    width: '100%',
  },
});

const initialState = {
  email: '',
  password: '',
  pending: false,
  error: '',
  showPassword: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload.email };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload.password };
    case 'LOGIN_PENDING':
      return { ...state, pending: true, error: '' };
    case 'LOGIN_SUCCESS':
      return { ...state, pending: false };
    case 'LOGIN_FAILURE':
      return { ...state, pending: false, error: action.payload.error };
    case 'SET_PASSWORD_VISIBLE':
      return { ...state, showPassword: action.payload.bool };
    default:
      return state;
  }
}

function Login() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const { dispatch: authDispatch } = useAuthContext();

  const handleEmail = (event) => {
    dispatch({ type: 'SET_EMAIL', payload: { email: event.target.value } });
  };

  const handlePassword = (event) => {
    dispatch({
      type: 'SET_PASSWORD',
      payload: { password: event.target.value },
    });
  };

  const handleClickShowPassword = () => {
    dispatch({
      type: 'SET_PASSWORD_VISIBLE',
      payload: { bool: !state.showPassword },
    });
  };

  const handleLogin = async () => {
    const { email, password } = state;
    dispatch({ type: 'LOGIN_PENDING' });

    try {
      const { data } = await api().post('/signin', { email, password });

      if (data) {
        const { user, token } = data;

        dispatch({ type: 'LOGIN_SUCCESS' });
        setAuthToken(token);
        authDispatch({ type: 'LOGIN', payload: { user, token } });
        history.push('/flights');
      }
    } catch ({ response }) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: { error: response && response.data.message },
      });
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box color="primary" mt={4} ml={3}>
          <Link className={classes.backLink} component={RouterLink} to="/">
            <ArrowBack color="primary" fontSize="small" />
            <Box className="back-text" ml={1}>
              Home
            </Box>
          </Link>
        </Box>

        <Box pl={4} mt={1}>
          <Typography className={classes.header} component="h1">
            Sign in
          </Typography>
        </Box>

        <FormGroup className={classes.loginForm} noValidate autoComplete="off">
          <ControlBox>
            <TextField
              id="email-field"
              label="Email"
              variant="outlined"
              value={state.email}
              onChange={handleEmail}
              fullWidth
            />
          </ControlBox>

          <ControlBox>
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="standard-adornment-password"
                type={state.showPassword ? 'text' : 'password'}
                value={state.password}
                onChange={handlePassword}
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )}
                labelWidth={70}
                required
              />
            </FormControl>
          </ControlBox>

          <Box className={classes.errorBox}>{state.error}</Box>

          <Box mt={4} p={2} pl={4} pr={4}>
            <SubmitButton
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleLogin}
              pending={state.pending}
            >
              Sign in
            </SubmitButton>
          </Box>

          <Box ml={4} mr={4} className={classes.divided} align="center">
            <span className={classes.divider} />
            <div className={classes.text}>or</div>
            <span className={classes.divider} />
          </Box>

          <Box p={2} pl={4} pr={4}>
            <Button
              component={RouterLink}
              to="/sign-up"
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
            >
              Sign up
            </Button>
          </Box>
        </FormGroup>
      </Box>
    </Box>
  );
}

export default Login;
