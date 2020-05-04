import React from 'react';
import { useHistory } from 'react-router-dom';
const Fade = require('react-reveal/Fade');

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  } as React.CSSProperties,
  singleContainer: {
    width: '275px',
    height: '275px',
    margin: '0.5em',
    cursor: 'pointer',
  },
};

const CategoryPlaylist = props => {
  const history = useHistory();
  const categoryId = props.location.state?.id;
  const playlists = props.location.state?.playlists;

  const handleFetchCategoryPlaylist = React.useCallback(
    async (tracksURL, playlist) => {
      await fetch(tracksURL, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      })
        .then(response => response.json())
        .then(data => {
          history.push({
            pathname: `/categories/${categoryId}/${playlist.id}`,
            state: {
              tracks: data.items,
              playlist,
            },
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    [categoryId, history],
  );

  return (
    <div>
      {playlists?.length === 0 ? (
        'Sorry We do not have any data to display!'
      ) : (
        <div style={style.container}>
          {playlists?.map(playlist => (
            <Fade key={playlist.id}>
              <div
                onClick={() =>
                  handleFetchCategoryPlaylist(playlist.tracks.href, playlist)
                }
                style={{
                  backgroundImage: `url(${playlist.images[0].url})`,
                  ...style.singleContainer,
                }}
              ></div>
            </Fade>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPlaylist;
