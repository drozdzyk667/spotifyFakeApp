import React from 'react';
import BottomBar from '../components/bottom-bar/BottomBar';
const Fade = require('react-reveal/Fade');

const style = {
  trackContainer: {
    display: 'flex',
    flexDirection: 'row',
  } as React.CSSProperties,
  container: {
    marginLeft: '50px',
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
  } as React.CSSProperties,
  spacer: {
    margin: '0 1em 0 1em',
  } as React.CSSProperties,
  trackText: {
    marginLeft: '2em',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  } as React.CSSProperties,
  imgContainer: { minWidth: '250px', width: '50%' },
  img: {
    position: 'fixed',
    minWidth: 'inherit',
    width: '25vw',
  } as React.CSSProperties,
  tracksContainer: {
    width: '100%',
    marginLeft: '5vw',
    borderLeft: '2px solid black',
  },
};

interface PickedSong {
  [key: string]: string;
}

const AlbumTracks = props => {
  const [activeTrack, setActiveTrack] = React.useState();
  const [pickedSong, setPickedSong] = React.useState<PickedSong>();
  const album = props.location.state?.album;
  const newTracks = props.location.state?.data;

  const handleSongPlay = (
    trackID,
    trackNumber,
    albumName,
    audioURL,
    artistName,
  ) => {
    setActiveTrack(trackID);
    setPickedSong({
      url: trackNumber,
      album_name: albumName,
      audio: audioURL,
      artist_name: artistName,
    });
  };

  return (
    <div>
      <div style={style.container}>
        <div style={style.imgContainer}>
          <Fade top>
            <img
              style={style.img}
              src={album?.images[0].url}
              alt="album_avatar"
            />
          </Fade>
        </div>
        <div style={style.tracksContainer}>
          {newTracks &&
            newTracks?.map((item, index) => (
              <div
                onClick={() =>
                  handleSongPlay(
                    item.id,
                    item.track_number,
                    item.name,
                    item.preview_url,
                    item.artists[0].name,
                  )
                }
                key={item.id}
                style={
                  activeTrack === item.id
                    ? { backgroundColor: '#ff4f6a', ...style.trackContainer }
                    : { ...style.trackContainer }
                }
              >
                <div style={style.trackText}>
                  <h1>{`${index + 1}.`}</h1>
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
