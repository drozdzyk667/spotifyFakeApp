import React from 'react';
import { useHistory } from 'react-router-dom';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  } as React.CSSProperties,
  title: {
    color: 'white',
    paddingLeft: '1em',
    fontSize: '1.5em',
  },
  singleContainer: {
    width: '300px',
    height: '300px',
    margin: '0.5em',
    cursor: 'pointer',
  },
};

interface Error {
  [key: string]: string;
}

const NewReleases = () => {
  const history = useHistory();
  const newAlbumsURL = 'https://api.spotify.com/v1/browse/new-releases';
  const [resAlbums, setResAlbums] = React.useState<any[]>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error>();

  const getAlbumTracks = async (albumID, album) => {
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
  };

  const getNewAlbums = async () => {
    setIsLoading(true);
    await fetch(newAlbumsURL, {
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
  };

  React.useEffect(() => {
    getNewAlbums();
  }, []);

  if (error) {
    return <p> {error.message}</p>;
  }

  if (isLoading) {
    return <p> {'Loading categories...'}</p>;
  }

  return (
    <div>
      {resAlbums ? (
        <div style={style.container}>
          {resAlbums.map(album => (
            <div
              key={album.id}
              onClick={() => getAlbumTracks(album.id, album)}
              style={{
                backgroundImage: `url(${album.images[1].url})`,
                ...style.singleContainer,
              }}
            ></div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default NewReleases;
