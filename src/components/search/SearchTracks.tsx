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
  resultsTitle: { borderBottom: '2px solid black', paddingTop: '1em' },
  bottomSpacer: { paddingBottom: '2em' },
};

interface ArtistsProps {
  tracks: any[];
}

const SearchArtists: React.FC<ArtistsProps> = ({ tracks }) => {
  return (
    <div>
      {tracks?.length > 0 ? (
        <div style={style.bottomSpacer}>
          <h3 style={style.resultsTitle}>{'Search results for Tracks'}</h3>
          <div style={style.container}>
            {tracks?.map(item => (
              <div key={item.id}>
                {item.album.images.length > 0 && (
                  <div style={style.dataContainer}>
                    <img
                      width={320}
                      height={320}
                      src={item.album.images[1].url}
                      alt="track_avatar"
                    />
                    <div style={{ padding: '0.5em' }}>
                      <h3>{`Name: ${item.name}`}</h3>
                      {item.artists.length > 0 ? (
                        <p>{`Main artist: ${item.artists[0].name}`}</p>
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

export default SearchArtists;
