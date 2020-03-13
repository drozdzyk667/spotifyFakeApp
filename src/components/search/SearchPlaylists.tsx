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

interface PlaylistProps {
  value: any[];
}

const SearchPlaylists: React.FC<PlaylistProps> = ({ value }) => {
  return (
    <div style={style.container}>
      {value?.map(playlist => (
        <div key={playlist.id}>
          {playlist.images.length >= 2 && (
            <div style={style.dataContainer}>
              <img
                width={320}
                height={320}
                src={playlist.images[1].url}
                alt="playlist_avatar"
              />
              <div style={style.spacer}>
                <h3>{`Name: ${playlist.name}`}</h3>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchPlaylists;
