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
  spacer: { padding: '0.5em' },
};

interface PlaylistProps {
  value: any[];
}

const SearchAlbums: React.FC<PlaylistProps> = ({ value }) => {
  return (
    <div style={style.container}>
      {value?.map(album => (
        <div key={album.id}>
          {album.images.length > 0 && (
            <div style={style.dataContainer}>
              <img
                width={320}
                height={320}
                src={album.images[1].url}
                alt="album_avatar"
              />
              <div style={style.spacer}>
                <h3>{`Name: ${album.name}`}</h3>
                {album.artists.length > 0 ? (
                  <p
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >{`Main artist: ${album.artists[0].name}`}</p>
                ) : null}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchAlbums;
