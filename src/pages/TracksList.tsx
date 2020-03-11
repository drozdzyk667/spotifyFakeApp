import React from "react";
import ReactPlayer from "react-player";
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
  songContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: "100px",
    backgroundColor: "gray",
    width: "100vw"
  } as React.CSSProperties,
  spacer: {
    margin: "0 1em 0 1em"
  },
  spacerArtist: {
    margin: "0 1em 0 1.6em"
  },
  alignRight: {
    marginLeft: "auto"
  }
};

const TracksList = props => {
  const playlist = props.location.state.playlist;
  const tracks = props.location.state.tracks;
  const [pickedSong, setPickedSong] = React.useState();

  const handleSongPlay = (avatarURL, albumName, audioURL, artistName) => {
    setPickedSong({
      url: avatarURL,
      album_name: albumName,
      audio: audioURL,
      artist_name: artistName
    });
  };

  return (
    <div>
      <div style={style.container}>
        <div>
          <img src={playlist.images[0].url} alt="album_avatar" />
        </div>
        <div>
          {tracks &&
            tracks.slice(0, 6).map(item => (
              <div
                onClick={() =>
                  handleSongPlay(
                    item.track.album.images[2].url,
                    item.track.album.name,
                    item.track.preview_url,
                    item.track.artists[0].name
                  )
                }
                key={item.track.id}
                style={style.trackContainer}
              >
                <img src={item.track.album.images[2].url} alt="track_avatar" />
                <div>
                  <h2 style={style.spacer}>{item.track.album.name}</h2>
                  <p style={style.spacerArtist}>{item.track.artists[0].name}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      {pickedSong ? (
        <div style={style.songContainer}>
          <div style={style.trackContainer}>
            <img src={pickedSong.url} alt="track_avatar" />
            <div>
              <h3 style={style.spacer}>{pickedSong.album_name}</h3>
              <p style={style.spacerArtist}>{pickedSong.artist_name}</p>
            </div>
            <div style={style.alignRight}>
              {pickedSong.audio ? (
                <ReactPlayer url={pickedSong.audio} controls height={60} />
              ) : (
                "We are truly sorry, We dont have DEMO recorded yet"
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TracksList;
