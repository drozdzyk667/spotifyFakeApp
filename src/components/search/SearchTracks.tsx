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
      {value?.map(track => (
        <div key={track.id}>
          {track.album.images.length > 0 && (
            <div style={style.dataContainer}>
              <img
                width={320}
                height={320}
                src={track.album.images[1].url}
                alt="track_avatar"
              />
              <div style={style.spacer}>
                <h3>{`Name: ${track.name}`}</h3>
                {track.artists.length > 0 ? (
                  <p>{`Main artist: ${track.artists[0].name}`}</p>
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
