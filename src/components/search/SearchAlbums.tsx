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

interface PlaylistProps {
  albums: any[];
}

const SearchAlbums: React.FC<PlaylistProps> = ({ albums }) => {
  return (
    <div>
      {albums?.length > 0 ? (
        <div style={style.bottomSpacer}>
          <h3 style={style.resultsTitle}>{'Search results for Albums'}</h3>
          <div style={style.container}>
            {albums?.map(item => (
              <div key={item.id}>
                {item.images.length > 0 && (
                  <div style={style.dataContainer}>
                    <img
                      width={320}
                      height={320}
                      src={item.images[1].url}
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

export default SearchAlbums;
