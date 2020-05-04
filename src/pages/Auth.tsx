import React from 'react';
import { getLoginURL } from '../components/loginAuth';
import { Button, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AuthPage = () => {
  const classes = useStyles();
  const [url, token] = getLoginURL();

  if (token) {
    localStorage.setItem('accessToken', token);
    window.location.reload();
  }

  return (
    <Box className={classes.root}>
      <Button variant="contained" color="primary" href={url} size="large">
        {'Login to Spotify'}
      </Button>
    </Box>
  );
};

export default AuthPage;
