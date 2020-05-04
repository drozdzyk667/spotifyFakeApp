import React from 'react';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
const Zoom = require('react-reveal/Zoom');

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  } as React.CSSProperties,
  singleContainer: {
    width: '300px',
    height: '300px',
    margin: '0.5em',
    cursor: 'pointer',
  },
  loader: {
    position: 'absolute',
    left: '50%',
    top: '30%',
  } as React.CSSProperties,
};

interface Error {
  [key: string]: string;
}

const NewReleases = () => {
  const history = useHistory();
  const NEW_ALBUMS_URI = 'https://api.spotify.com/v1/browse/new-releases';
  const [resAlbums, setResAlbums] = React.useState<any[]>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error>();

  const getAlbumTracks = React.useCallback(
    async (albumID, album) => {
      await fetch(`https://api.spotify.com/v1/albums/${albumID}/tracks`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      })
        .then(response => response.json())
        .then(data => {
          history.push({
            pathname: `/new-releases/${albumID}`,
            state: {
              data: data.items,
              album,
            },
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    [history],
  );

  const getNewAlbums = React.useCallback(async () => {
    setIsLoading(true);
    await fetch(NEW_ALBUMS_URI, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
      .then(res => {
        return res.ok ? res.json() : null;
      })
      .then(data => {
        setResAlbums(data.albums.items);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  React.useEffect(() => {
    getNewAlbums();
  }, [getNewAlbums]);

  if (error) {
    return <p> {error.message}</p>;
  }

  if (isLoading) {
    return (
      <div style={style.loader}>
        <Loader type="Audio" color="black" height={100} width={100} />
        <p> {'Loading New Releases...'}</p>
      </div>
    );
  }

  return (
    <div>
      {resAlbums ? (
        <div style={style.container}>
          {resAlbums.map(album => (
            <Zoom key={album.id}>
              <div
                onClick={() => getAlbumTracks(album.id, album)}
                style={{
                  backgroundImage: `url(${album.images[1].url})`,
                  ...style.singleContainer,
                }}
              ></div>
            </Zoom>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default NewReleases;
