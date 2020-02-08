import { createStackNavigator } from 'react-navigation-stack';

import Profile from '../screens/Profile';
import Friends from '../screens/Friends';

const InsideNavigator = createStackNavigator(
  {
    UserProfile: Profile,
    Friends: Friends
  },
  {
    headerMode: 'none',
  }
);

export default InsideNavigator;