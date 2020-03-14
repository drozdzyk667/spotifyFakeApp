import React from 'react';
import { shallow } from 'enzyme';
import UserProfile from './UserProfile';

const clickFn = jest.fn();
describe('User Profile', () => {
  it('button click should open external spotify user account page', () => {
    const component = shallow(<UserProfile onClick={clickFn} />);
    expect(
      component.find('a').text('Visit Your Spotify Profile'),
    ).toMatchSnapshot();
    expect(
      component
        .find('a')
        .findWhere(d => d.prop('data-testid'))
        .simulate('click', true),
    ).toMatchSnapshot();
  });
});
