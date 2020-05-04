import React from 'react';
import Navigation from './components/Navigation';
import AuthPage from './pages/Auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { getAuthData } from './helpers/loginAuth';

const App = () => {
  const [token] = getAuthData();
  return (
    <Router>
      {token && window.localStorage.getItem('accessToken') ? (
        <Navigation />
      ) : (
        <AuthPage />
      )}
    </Router>
  );
};

export default App;
