import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from 'components/Layout';
import Router from 'routes';
import AuthProvider from 'providers/AuthProvider';
import SessionProvider from 'providers/SessionProvider';
import flightAppTheme from 'styles/theme';
import { ThemeProvider } from '@material-ui/core';

function App() {
  return (
    <ThemeProvider theme={flightAppTheme}>
      <AuthProvider>
        <SessionProvider>
          <BrowserRouter>
            <Layout>
              <Router />
            </Layout>
          </BrowserRouter>
        </SessionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
