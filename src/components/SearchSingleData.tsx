import React from 'react';

const style = {
  spacer: { padding: '0.5em' },
};

interface SearchProps {
  name: string;
  value: { [key: string]: string | { [key: string]: string } };
}

const SearchSingleData: React.FC<SearchProps> = ({ value, name }) => {
  switch (name) {
    case 'albums':
      return (
        <div style={style.spacer}>
          <h3>{`Name: ${value.name}`}</h3>
          {value.artists.length > 0 ? (
            <p>{`Main artist: ${value.artists[0].name}`}</p>
          ) : null}
        </div>
      );
    case 'tracks':
      return (
        <div style={style.spacer}>
          <h3>{`Name: ${value.name}`}</h3>
          {value.artists.length > 0 ? (
            <p>{`Main artist: ${value.artists[0].name}`}</p>
          ) : null}
        </div>
      );
    case 'artists':
      return (
        <div style={style.spacer}>
          <h3>{`Name: ${value.name}`}</h3>
          {value.genres.length > 0 ? (
            <p>{`Genre: ${value.genres[0]}`}</p>
          ) : null}
        </div>
      );
    case 'playlists':
      return (
        <div style={style.spacer}>
          <h3>{`Name: ${value.name}`}</h3>
        </div>
      );
  }
  return null;
};

export default SearchSingleData;
