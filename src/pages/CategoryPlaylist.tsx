import React from "react";
import { useHistory } from "react-router-dom";

const style = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  } as React.CSSProperties,
  singleContainer: {
    width: "275px",
    height: "275px",
    margin: "0.5em",
    cursor: "pointer"
  }
};

const CategoryPlaylist = props => {
  const playlists = props.location.state.playlists;
  const categoryId = props.location.state.id;
  const history = useHistory();

  const handleCategoryPlaylist = async (tracksURL, playlist) => {
    await fetch(tracksURL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken")
      }
    })
      .then(response => response.json())
      .then(data => {
        history.push({
          pathname: `/categories/${categoryId}/${playlist.id}`,
          state: {
            tracks: data.items,
            playlist
          }
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      {playlists.length === 0 ? (
        "Sorry We do not have any data to display!"
      ) : (
        <div style={style.container}>
          {playlists.map(playlist => (
            <div key={playlist.id}>
              <div
                onClick={() =>
                  handleCategoryPlaylist(playlist.tracks.href, playlist)
                }
                style={{
                  backgroundImage: `url(${playlist.images[0].url})`,
                  ...style.singleContainer
                }}
              ></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPlaylist;
