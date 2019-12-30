import UserServiceAPI from '../../services/Users.service';
import { GET_USER_DATA, UPDATE_USER_DATA } from '../actions/types';


export const getUserData = () => dispatch => {
    let id = 0; //TODO get from local store
    let userData = await UserServiceAPI.getUser(id); //TODO 
    return dispatch({
        type: GET_USER_DATA,
        payload: userData
    });
};

export const updateUserData = () => dispatch => {
    let id = 0; //TODO get from local store
    let userData = await UserServiceAPI.updateUser(id); //TODO 
    return dispatch({
        type: UPDATE_USER_DATA,
        payload: userData
    });
};