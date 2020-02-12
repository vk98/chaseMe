import { createStackNavigator } from 'react-navigation-stack';

import Profile from '../screens/Profile';
import Friends from '../screens/Friends';
import UserProfile from '../screens/UserProfile';
import ChatScreen from '../screens/ChatScreen';


const InsideNavigator = createStackNavigator(
  {
    
    Friends: Friends,
    ChatScreen: ChatScreen,
    Profile: Profile
    //UserProfile: UserProfile
  },
  {
    headerMode: 'none',
  }
);

export default InsideNavigator;