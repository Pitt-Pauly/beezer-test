import React from 'react';
import { shallow } from 'enzyme';
import UserTable from '../UserTable';

const mockApiData = {
  accounts: {
    '-Kd_teAAXcw2b5MyFPIT': {
      apps: {
        cuckoosnest: {
          title: 'One Flew Over The Cuckoo’s Nest'
        }
      }
    }
  },
  users: {
    '00L91c7cvUaghNmGlC0lJa9eZ102': {
      account: '-Kd_teAAXcw2b5MyFPIT',
      name: 'Randle McMurphy'
    }
  }
};

test('UserTable renders correcty without data', () => {
  const component = shallow(<UserTable accounts={null} users={null} />);
  expect(component).toMatchSnapshot();
});

test('UserTable renders correcty with mock data', () => {
  const component = shallow(<UserTable {...mockApiData} />);
  expect(component).toMatchSnapshot();
});
