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
  spacer: { padding: '0.5em' },
};

interface ArtistsProps {
  value: any[];
}

const SearchArtists: React.FC<ArtistsProps> = ({ value }) => {
  return (
    <div style={style.container}>
      {value?.map(artist => (
        <div key={artist.id}>
          {artist.images.length > 0 && (
            <div style={style.dataContainer}>
              <img
                width={320}
                height={320}
                src={artist.images[1].url}
                alt="artist_avatar"
              />
              <div style={style.spacer}>
                <h3>{`Name: ${artist.name}`}</h3>
                {artist.genres.length > 0 ? (
                  <p>{`Genre: ${artist.genres[0]}`}</p>
                ) : null}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchArtists;
