import React from "react";
import BottomBar from "../components/BottomBar";

const style = {
  trackContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "1em"
  } as React.CSSProperties,
  container: {
    display: "flex",
    flexDirection: "row",
    flex: "2 1",
    cursor: "pointer"
  } as React.CSSProperties,
  spacer: {
    margin: "0 1em 0 1em"
  },
  spacerArtist: {
    margin: "0 1em 0 1.6em"
  }
};

const AlbumTracks = props => {
  const newTracks = props.location.state.data;
  const album = props.location.state.album;
  const [pickedSong, setPickedSong] = React.useState();

  const handleSongPlay = (trackNumber, albumName, audioURL, artistName) => {
    setPickedSong({
      url: trackNumber,
      album_name: albumName,
      audio: audioURL,
      artist_name: artistName
    });
  };

  return (
    <div>
      <div style={style.container}>
        <div>
          <img src={album.images[0].url} alt="album_avatar" />
        </div>
        <div>
          {newTracks &&
            newTracks.slice(0, 5).map(item => (
              <div
                onClick={() =>
                  handleSongPlay(
                    item.track_number,
                    item.name,
                    item.preview_url,
                    item.artists[0].name
                  )
                }
                key={item.id}
                style={style.trackContainer}
              >
                <div
                  style={{
                    marginLeft: "2em",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <h1>{`${item.track_number}.`}</h1>
                  <h2 style={style.spacer}>{item.name}</h2>
                </div>
              </div>
            ))}
        </div>
      </div>
      {pickedSong && <BottomBar pickedSong={pickedSong} isAlbum={true} />}
    </div>
  );
};

export default AlbumTracks;
