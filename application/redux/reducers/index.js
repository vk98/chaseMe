import { combineReducers } from 'redux';
import MapReducer from '../reducers/MapReducer';
import UserReducer from '../reducers/UserReducer';
import LoginReducer from '../reducers/LoginReducer';
export default combineReducers({
  mapData: MapReducer,
  userData: UserReducer,
  loginData: LoginReducer
});
