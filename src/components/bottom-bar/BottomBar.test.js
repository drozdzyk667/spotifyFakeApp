import React from 'react';
import { shallow } from 'enzyme';
import BottomBar from './BottomBar';

describe('BottomBar', () => {
  const pickedSong = {
    url: 'test123',
    audio: 'audiotest',
    artist_name: 'TEST_name',
    album_name: 'TEST_album',
  };
  it('should render correctly with passed props', () => {
    const component = shallow(<BottomBar pickedSong={pickedSong} />);
    expect(component).toMatchSnapshot();
  });
});
