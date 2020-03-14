import React from "react";
import ReactPlayer from "react-player";

const style = {
  trackContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "1em"
  } as React.CSSProperties,
  songContainer: {
    position: "fixed",
    zIndex: 2,
    left: 0,
    bottom: 0,
    height: "100px",
    backgroundColor: "#404040",
    width: "100vw"
  } as React.CSSProperties,
  spacer: {
    margin: "0 1em 0 1em",
    color: "white"
  },
  spacerArtist: {
    margin: "0 1em 0 1.6em",
    color: "white"
  },
  alignRight: {
    marginLeft: "auto",
    paddingRight: "20px"
  }
};

interface BarProps {
  pickedSong: { [key: string]: string };
  isAlbum?: boolean;
}

const BottomBar: React.FC<BarProps> = ({ pickedSong, isAlbum }) => {
  return (
    <div style={style.songContainer}>
      <div style={style.trackContainer}>
        {!isAlbum ? <img src={pickedSong.url} alt="track_avatar" /> : null}
        <div>
          <h3 style={style.spacer}>{pickedSong.album_name}</h3>
          <p style={style.spacerArtist}>{pickedSong.artist_name}</p>
        </div>
        <div style={style.alignRight}>
          {pickedSong.audio ? (
            <ReactPlayer url={pickedSong.audio} controls height={60} />
          ) : (
            <span style={style.spacer}>
              {"We are truly sorry, We dont have DEMO recorded yet"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
