import React from 'react';
import SearchSingleData from '../components/SearchSingleData';
import Select from 'react-select';
const Fade = require('react-reveal/Fade');

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

const customStyles = {
  control: styles => ({
    ...styles,
    cursor: 'pointer',
    width: '120px',
    boxShadow: 'none',
  }),
  menu: styles => ({
    ...styles,
    width: '120px',
  }),
};

const options: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'albums', label: 'Albums' },
  { value: 'playlists', label: 'Playlists' },
  { value: 'artists', label: 'Artists' },
  { value: 'tracks', label: 'Tracks' },
];

interface Filtered {
  [key: string]: string;
}

const SearchContent = props => {
  const searchValues = props.location.state.data;
  const isLoading = props.location.state?.isLoading;
  const [filtered, setFiltered] = React.useState<Filtered>(options[0]);

  if (isLoading) {
    return <p> {'Loading data...'}</p>;
  }

  const hasData = searchValues.every(item => {
    return !!(item.data.length > 0);
  });

  if (!hasData) {
    return <p>{'Please provide valid data...'}</p>;
  }

  const handleFilter = selectedOption => {
    setFiltered(selectedOption);
  };

  const filteredData =
    filtered.value === options[0].value
      ? searchValues
      : searchValues.filter(item => filtered.value === item.name);

  return (
    <div>
      <Select
        isSearchable={false}
        placeholder={filtered.label}
        styles={customStyles}
        value={null}
        onChange={handleFilter}
        options={options}
        components={{ IndicatorSeparator: () => null }}
      />
      {filteredData.map(
        element =>
          element.data && (
            <div key={element.name} style={style.bottomSpacer}>
              <h3
                style={style.resultsTitle}
              >{`Search results for ${element.name.charAt(0).toUpperCase() +
                element.name.slice(1)}`}</h3>
              <div style={style.container}>
                {element.data?.map(item => (
                  <Fade bottom key={item.id}>
                    {(item.images
                      ? item.images.length >= 2
                      : item.album.images.length >= 2) && (
                      <div style={style.dataContainer}>
                        <img
                          width={320}
                          height={320}
                          src={
                            item.album
                              ? item.album.images[1].url
                              : item.images[1].url
                          }
                          alt="avatar"
                        />
                        <SearchSingleData value={item} name={element.name} />
                      </div>
                    )}
                  </Fade>
                ))}
              </div>
            </div>
          ),
      )}
    </div>
  );
};

export default SearchContent;
