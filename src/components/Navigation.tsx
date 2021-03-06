import React from 'react';
import { NavLink } from 'react-router-dom';
import Routes from '../routes/Routes';
import Search from './Search';
import spotifyLogo from '../assets/spotify_logo.png';

const style = {
  topBar: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 1,
    height: '30px',
    padding: '1em',
    backgroundColor: '#0f0f0f',
  } as React.CSSProperties,
  content: {
    padding: '2em',
    margin: '0 0 100px 250px',
  },
  sideBar: {
    zIndex: 2,
    width: '250px',
    position: 'fixed',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.2em',
    backgroundColor: 'black',
  } as React.CSSProperties,
  linkText: {
    color: 'white',
    padding: '0.5em',
  },
  link: {
    textDecoration: 'none',
  },
  activeRoute: {
    backgroundColor: '#414344',
  },
  align: {
    padding: '1em',
    paddingBottom: '2em',
  },
};

const Navigation = () => {
  return (
    <>
      <div>
        <div style={style.sideBar}>
          <a
            href="https://www.spotify.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              style={style.align}
              width={150}
              height={45}
              src={spotifyLogo}
              alt="spotify_logo"
            />
          </a>
          <NavLink
            style={style.link}
            activeStyle={style.activeRoute}
            to="/new-releases"
          >
            <div style={style.linkText}>{'New Releases'}</div>
          </NavLink>
          <NavLink
            style={style.link}
            activeStyle={style.activeRoute}
            to="/categories"
          >
            <div style={style.linkText}>{'Categories'}</div>
          </NavLink>
        </div>
        <div>
          <div style={style.topBar}>
            <Search />
          </div>
          <main style={style.content}>
            <Routes />
          </main>
        </div>
      </div>
    </>
  );
};

export default Navigation;
