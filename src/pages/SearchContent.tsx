import React from 'react';

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
  dataContainer: {
    margin: '0.5em',
    border: '1px dashed gray',
    width: '320px',
    height: '450px',
    flexWrap: 'wrap',
  } as React.CSSProperties,
};

const SearchContent = props => {
  const artists = props.location.state?.artists;
  const tracks = props.location.state?.tracks;
  const isLoading = props.location.state?.isLoading;

  if (isLoading) {
    return <p> {'Loading data...'}</p>;
  }

  const checkValidate = value => {
    return !!(value.length > 0);
  };

  if (!(checkValidate(artists) && checkValidate(tracks))) {
    return <p>{'Please provide valid data...'}</p>;
  }

  return (
    <div>
      {console.log(props.location.state)}
      {artists?.length > 0 ? (
        <div>
          <h3 style={{ borderBottom: '2px solid black' }}>
            {'Search results for Artists'}
          </h3>
          <div style={style.container}>
            {artists?.map(artist => (
              <div key={artist.id}>
                {artist.images.length > 0 && (
                  <div style={style.dataContainer}>
                    <img
                      width={320}
                      height={320}
                      src={artist.images[1].url}
                      alt="artist_avatar"
                    />
                    <div style={{ padding: '0.5em' }}>
                      <h3>{`Name: ${artist.name}`}</h3>
                      {artist.genres.length > 0 ? (
                        <p
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >{`Genre: ${artist.genres[0]}`}</p>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {tracks?.length > 0 ? (
        <div>
          <h3 style={{ borderBottom: '2px solid black' }}>
            {'Search results for Tracks'}
          </h3>
          <div style={style.container}>
            {tracks?.map(item => (
              <div key={item.id}>
                {item.album.images.length > 0 && (
                  <div style={style.dataContainer}>
                    <img
                      width={320}
                      height={320}
                      src={item.album.images[1].url}
                      alt="album_avatar"
                    />
                    <div style={{ padding: '0.5em' }}>
                      <h3>{`Name: ${item.name}`}</h3>
                      {item.artists.length > 0 ? (
                        <p
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >{`Main artist: ${item.artists[0].name}`}</p>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchContent;
