import React from 'react';
import { mount } from 'enzyme';
import SearchSingleData from '../components/SearchSingleData';

describe('Search Logic', () => {
  const name = 'playlists';
  const data = [
    {
      id: '123',
      name: 'playlists',
      images: [{ url: 'test_image1' }, { url: 'test_image2' }],
    },
  ];
  const wrapper = mount(<SearchSingleData name={name} value={data} />);

  it('check passed props values', () => {
    expect(wrapper.props().name).toBe('playlists');
    expect(wrapper.prop('value')).toBe(data);
  });

  it('check return components', () => {
    expect(wrapper.children).toHaveLength(1);
    expect(wrapper.find(<div />));
  });
});
