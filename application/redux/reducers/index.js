import { combineReducers } from 'redux';
import MapReducer from '../reducers/MapReducer';
import UserReducer from '../reducers/UserReducer';
import LoginReducer from '../reducers/LoginReducer';
import FriendsReducer from '../reducers/FriendsReducer';
import ProfileReducer from '../reducers/ProfileReducer';
export default combineReducers({
  mapData: MapReducer,
  userData: UserReducer,
  loginData: LoginReducer,
  friendsData: FriendsReducer,
  profileData: ProfileReducer
});
