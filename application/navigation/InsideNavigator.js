import { createStackNavigator } from 'react-navigation-stack';

import ProfileScreen from '../screens/Profile';
import Friends from '../screens/Friends';

const InsideNavigator = createStackNavigator(
  {
    UserProfile: ProfileScreen,
    Friends: Friends
  },
  {
    headerMode: 'none',
  }
);

export default InsideNavigator;