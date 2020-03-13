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
  artists: any[];
}

const SearchArtists: React.FC<ArtistsProps> = ({ artists }) => {
  return (
    <div>
      {artists?.length > 0 ? (
        <div style={style.bottomSpacer}>
          <h3 style={style.resultsTitle}>{'Search results for Artists'}</h3>
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
    </div>
  );
};

export default SearchArtists;
