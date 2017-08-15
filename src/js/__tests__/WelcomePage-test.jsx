import React from 'react';
import { shallow, mount } from 'enzyme';

import WelcomePage from '../components/WelcomePage.react';

describe('A welcome page', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<WelcomePage />).contains(<h1>Battleship</h1>)).toBe(true);
  });

  it('should be selectable by class "welcome"', () => {
    expect(shallow(<WelcomePage />).is('.welcome')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(<WelcomePage />).find('.welcome').length).toBe(1);
  });
});
