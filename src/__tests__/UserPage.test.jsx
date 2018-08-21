import React from 'react';
import { shallow } from 'enzyme';
import UserPage from '../UserPage';

test('UserPage renders correcty', () => {
  const component = shallow(<UserPage />);
  expect(component).toMatchSnapshot();
});
