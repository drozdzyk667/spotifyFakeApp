import React from 'react';
import Navigation from './components/Navigation';
import AuthPage from './pages/Auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { getLoginURL } from './components/loginAuth';

const App = () => {
  const [token] = getLoginURL();
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
