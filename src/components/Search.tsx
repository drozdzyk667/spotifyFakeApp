import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Avatar from '../images/user_avatar.png';

const style = {
  avatar: {
    position: 'absolute',
    right: '1%',
    top: '10%',
  } as React.CSSProperties,
  cursor: {
    cursor: 'pointer',
  },
};

const Search = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const history = useHistory();
  const pushSearchData = async () => {
    setIsLoading(true);
    await fetch(
      `https://api.spotify.com/v1/search?q=${searchValue}&type=artist,track,album,playlist`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      },
    )
      .then(res => {
        return res.ok ? res.json() : null;
      })
      .then(data => {
        history.push({
          pathname: `/search/${searchValue}`,
          state: {
            albums: data.albums.items ?? [],
            playlists: data.playlists.items ?? [],
            artists: data.artists.items ?? [],
            tracks: data.tracks.items ?? [],
            isLoading,
          },
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.warn(error);
      });
    setSearchValue('');
  };

  const disableAppCrash = event => {
    if (event.which === 13) {
      event.preventDefault();
    }
  };

  return (
    <form>
      <input
        style={{ marginLeft: '250px' }}
        type="text"
        onKeyPress={disableAppCrash}
        value={searchValue}
        onChange={handleSearch}
      />
      <button onClick={pushSearchData} style={style.cursor} type="button">
        Search
      </button>
      <Link style={style.cursor} to="/user">
        <img style={style.avatar} src={Avatar} width={50} alt="UserAvatar" />
      </Link>
    </form>
  );
};

export default Search;
