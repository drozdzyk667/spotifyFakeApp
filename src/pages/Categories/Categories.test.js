import * as React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Categories from './Categories';

describe('Category component', () => {
  it('should have correct and be clickable', () => {
    const component = mount(
      <MemoryRouter
        initialEntries={[{ pathname: '/categories', key: 'testKey' }]}
      >
        <Categories />
      </MemoryRouter>,
    );
    const link = component.find({ 'data-testid': 'category-link' });
    expect(
      link
        .find('div')
        .findWhere(d => d.prop('data-testid').simulate('click', true)),
    ).toMatchSnapshot();
  });

  it('should render correct category name', () => {
    const component = mount(
      <MemoryRouter
        initialEntries={[{ pathname: '/categories', key: 'testKey' }]}
      >
        <Categories />
      </MemoryRouter>,
    );
    expect(component.find('h3').findWhere(d => d.toEqual('pop')));
    component.unmount();
  });
});
