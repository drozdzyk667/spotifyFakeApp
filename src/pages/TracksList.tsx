import React from 'react';
import BottomBar from '../components/BottomBar';
const Fade = require('react-reveal/Fade');

const style = {
  trackContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: '1em',
    marginLeft: '2vw',
    borderLeft: '2px solid black',
  } as React.CSSProperties,
  container: {
    marginLeft: '50px',
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
  } as React.CSSProperties,
  spacer: {
    margin: '0 1em 0 1em',
  },
  spacerArtist: {
    margin: '0 1em 0 1.6em',
  },
  imgContainer: { minWidth: '200px', width: '20%' },
  img: {
    position: 'fixed',
    minWidth: 'inherit',
    width: '15vw',
  } as React.CSSProperties,
  tracksContainer: {
    width: '100%',
    marginLeft: '5vw',
  },
};

interface PickedSong {
  [key: string]: string;
}

const TracksList = props => {
  const playlist = props.location.state?.playlist;
  const tracks = props.location.state?.tracks;
  const [pickedSong, setPickedSong] = React.useState<PickedSong>();
  const [activeTrack, setActiveTrack] = React.useState();

  const handleSongPlay = (
    trackID,
    avatarURL,
    albumName,
    audioURL,
    artistName,
  ) => {
    setActiveTrack(trackID);
    setPickedSong({
      url: avatarURL,
      album_name: albumName,
      audio: audioURL,
      artist_name: artistName,
    });
  };

  return (
    <div>
      <div style={style.container}>
        <div style={style.imgContainer}>
          <Fade left>
            <img
              style={style.img}
              src={playlist?.images[0].url}
              alt="album_avatar"
            />
          </Fade>
        </div>
        <div style={style.tracksContainer}>
          {tracks &&
            tracks?.map(item =>
              item?.track ? (
                <div
                  key={item.track.id}
                  onClick={() =>
                    handleSongPlay(
                      item.track.id,
                      item.track.album.images[2].url,
                      item.track.album.name,
                      item.track.preview_url,
                      item.track.artists[0].name,
                    )
                  }
                  style={
                    activeTrack === item.track.id
                      ? {
                          backgroundColor: '#ff4f6a',
                          ...style.trackContainer,
                        }
                      : { ...style.trackContainer }
                  }
                >
                  <img
                    src={item.track.album.images[2].url}
                    alt="track_avatar"
                  />
                  <div>
                    <h2 style={style.spacer}>{item.track.album.name}</h2>
                    <p style={style.spacerArtist}>
                      {item.track.artists[0].name}
                    </p>
                  </div>
                </div>
              ) : null,
            )}
        </div>
      </div>
      {pickedSong && <BottomBar pickedSong={pickedSong} />}
    </div>
  );
};

export default TracksList;
