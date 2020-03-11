import React from "react";

const style = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  } as React.CSSProperties,
  title: {
    color: "white",
    paddingLeft: "1em",
    fontSize: "1.5em"
  },
  dataContainer: {
    margin: "0.5em",
    border: "1px dashed gray",
    width: "320px",
    height: "450px",
    flexWrap: "wrap"
  } as React.CSSProperties
};

const SearchContent = props => {
  const artists = props.location.state.details;
  const isLoading = props.location.state.isLoading;

  if (isLoading) {
    return <p> {"Loading data..."}</p>;
  }

  return (
    <div style={style.container}>
      {artists.length > 0
        ? artists.map(artist => (
            <div key={artist.id}>
              {artist.images.length > 0 && (
                <div style={style.dataContainer}>
                  <img
                    width={320}
                    height={320}
                    src={artist.images[1].url}
                    alt="artist_avatar"
                  />
                  <div style={{ padding: "0.5em" }}>
                    <h3>{`Name: ${artist.name}`}</h3>
                    {artist.genres.length > 0 ? (
                      <p
                        style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                      >{`Genre: ${artist.genres[0]}`}</p>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          ))
        : "Please provide valid data..."}
    </div>
  );
};

export default SearchContent;
