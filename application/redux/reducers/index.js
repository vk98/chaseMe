import { combineReducers } from 'redux';
import MapReducer from '../reducers/MapReducer';
import UserReducer from '../reducers/UserReducer';
export default combineReducers({
  mapData: MapReducer,
  userData: UserReducer
});
