import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Avatar from '../images/user_avatar.png';
import SearchIcon from '../images/search_icon.png';
const Fade = require('react-reveal/Fade');

const style = {
  avatar: {
    position: 'absolute',
    right: '1%',
    top: '10%',
  } as React.CSSProperties,
  cursor: {
    cursor: 'pointer',
  },
  input: {
    padding: '5px',
    borderRadius: '3px',
    border: 'none',
    fontWeight: 'bold',
  } as React.CSSProperties,
  search: {
    margin: '0 20px 0 250px',
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  } as React.CSSProperties,
};

const Search = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

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
            data: [
              { name: 'albums', data: data.albums.items ?? [] },
              { name: 'playlists', data: data.playlists.items ?? [] },
              { name: 'artists', data: data.artists.items ?? [] },
              { name: 'tracks', data: data.tracks.items ?? [] },
            ],
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
      if (searchValue) {
        pushSearchData();
      }
    }
  };

  const openInputBox = () => {
    setIsOpen(open => !open);
    setSearchValue('');
  };

  return (
    <form>
      <div style={style.searchContainer}>
        <img
          width={30}
          onClick={openInputBox}
          alt="search_icon"
          src={SearchIcon}
          style={{
            ...style.cursor,
            ...style.search,
          }}
        />
        {isOpen && (
          <Fade duration={300}>
            <input
              style={style.input}
              type="text"
              onKeyPress={disableAppCrash}
              value={searchValue}
              onChange={handleSearch}
            />
          </Fade>
        )}
      </div>
      <Link style={style.cursor} to="/user">
        <img style={style.avatar} src={Avatar} width={50} alt="UserAvatar" />
      </Link>
    </form>
  );
};

export default Search;
