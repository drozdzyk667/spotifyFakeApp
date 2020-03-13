import React from 'react';
import SearchSingleData from '../components/search/SearchSingleData';

const style = {
  resultsTitle: { borderBottom: '2px solid black', paddingTop: '1em' },
  bottomSpacer: { paddingBottom: '2em' },
};

const SearchContent = props => {
  const searchValues = props.location.state.data;
  const isLoading = props.location.state?.isLoading;

  if (isLoading) {
    return <p> {'Loading data...'}</p>;
  }

  const hasData = searchValues.every(item => {
    return !!(item.data.length > 0);
  });

  if (!hasData) {
    return <p>{'Please provide valid data...'}</p>;
  }

  return (
    <div>
      {searchValues.map(element =>
        element.data.length !== 0 ? (
          <div key={element.name} style={style.bottomSpacer}>
            <h3
              style={style.resultsTitle}
            >{`Search results for ${element.name.charAt(0).toUpperCase() +
              element.name.slice(1)}`}</h3>
            <SearchSingleData name={element.name} value={element.data} />
          </div>
        ) : null,
      )}
    </div>
  );
};

export default SearchContent;
