import React from 'react';
import SearchArtists from '../../components/search/SearchArtists';
import SearchTracks from '../../components/search/SearchTracks';
import SearchPlaylists from '../../components/search/SearchPlaylists';
import SearchAlbums from '../../components/search/SearchAlbums';

interface SearchProps {
  name: string;
  value: any[];
}

const SearchSingleData: React.FC<SearchProps> = ({ value, name }) => {
  switch (name) {
    case 'albums':
      return <SearchAlbums value={value} />;
    case 'tracks':
      return <SearchTracks value={value} />;
    case 'artists':
      return <SearchArtists value={value} />;
    case 'playlists':
      return <SearchPlaylists value={value} />;
  }
  return null;
};

export default SearchSingleData;
