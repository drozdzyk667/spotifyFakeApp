import React, { useCallback } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
const Zoom = require('react-reveal/Zoom');
const Fade = require('react-reveal/Fade');

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: '2em',
    margin: '2em',
  } as React.CSSProperties,
  spacer: {
    margin: '2em',
  },
  spotifyButton: {
    textDecoration: 'none',
    padding: '0.5em',
    borderRadius: '10px',
    backgroundColor: 'black',
    color: 'white',
  },
  buttonPadding: { paddingTop: '20px' },
  avatarImg: { borderRadius: '50%' },
  loader: {
    position: 'absolute',
    left: '50%',
    top: '30%',
  } as React.CSSProperties,
};

interface FetchUserData {
  email: string;
  display_name: string;
  images: [{ [key: string]: string }];
  external_urls: { spotify: string };
  type: string;
  followers: { [key: string]: number };
}

interface Error {
  [key: string]: string;
}

const UserProfile = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error>();
  const [userPofileData, setUserPofileData] = React.useState<FetchUserData>();
  const MIN_FOLLOWERS = 0;
  const USER_URL = 'https://api.spotify.com/v1/me';

  const getUserInfo = useCallback(async () => {
    setIsLoading(true);
    await fetch(USER_URL, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
      .then(res => {
        return res.ok ? res.json() : null;
      })
      .then(data => {
        setUserPofileData(data);
        setIsLoading(false);
      })
      .catch(error => setError(error));
  }, []);

  React.useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  if (error) {
    return <p> {error.message}</p>;
  }

  if (isLoading) {
    return (
      <div style={style.loader}>
        <Loader type="Audio" color="black" height={100} width={100} />
        <p>{'Loading User data...'}</p>
      </div>
    );
  }

  return (
    <Fade>
      <div style={style.container}>
        {userPofileData?.images[0]?.url ? (
          <Zoom delay={200}>
            <img
              style={style.avatarImg}
              src={userPofileData.images[0].url}
              alt="user_photo"
            />
          </Zoom>
        ) : null}
        <div style={style.spacer}>
          <h1>{`Hey ${userPofileData?.display_name}, you have ${userPofileData?.type} rights !`}</h1>
          <h4>
            {`User email: ${userPofileData?.email ??
              "You haven't provided any :("}`}
          </h4>
          <b>{`Followers: ${
            userPofileData?.followers.total === MIN_FOLLOWERS
              ? 'You have 0, Come on!'
              : userPofileData?.followers.total
          }`}</b>
          <div style={style.buttonPadding}>
            <a
              data-testid="userProfile-button"
              style={style.spotifyButton}
              href={userPofileData?.external_urls.spotify}
              rel="noopener noreferrer"
              target="_blank"
            >{`Visit Your Spotify Profile`}</a>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default UserProfile;
