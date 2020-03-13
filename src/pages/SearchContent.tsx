import React from 'react';
import SearchArtists from '../components/search/SearchArtists';
import SearchTracks from '../components/search/SearchTracks';
import SearchPlaylists from '../components/search/SearchPlaylists';
import SearchAlbums from '../components/search/SearchAlbums';

const SearchContent = props => {
  const albums = props.location.state.albums;
  const playlists = props.location.state.playlists;
  const artists = props.location.state?.artists;
  const tracks = props.location.state?.tracks;
  const isLoading = props.location.state?.isLoading;

  if (isLoading) {
    return <p> {'Loading data...'}</p>;
  }

  const checkValidate = () => {
    return !!([...albums, ...playlists, ...artists, ...tracks].length > 0);
  };

  if (!checkValidate()) {
    return <p>{'Please provide valid data...'}</p>;
  }

  return (
    <div>
      <SearchAlbums albums={albums} />
      <SearchArtists artists={artists} />
      <SearchPlaylists playlists={playlists} />
      <SearchTracks tracks={tracks} />
    </div>
  );
};

export default SearchContent;
