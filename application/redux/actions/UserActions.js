import UserServiceAPI from '../../services/User.service';
import { GET_USER_DATA, UPDATE_USER_DATA, USER_LOGIN, USER_LOGOUT } from '../actions/types';
import { AsyncStorage } from 'react-native';

export const getUserData = () => async dispatch => {
    let userData = JSON.parse(await AsyncStorage.getItem('user'));
    return dispatch({
        type: GET_USER_DATA,
        payload: userData
    });
};

export const getCurrentUserData = () => async dispatch => {
    let id = JSON.parse(await AsyncStorage.getItem('user'))._id;
    let userData = await UserServiceAPI.getUser(id);
    await AsyncStorage.setItem('user', userData);
    return dispatch({
        type: GET_USER_DATA,
        payload: userData
    });
};

export const updateUserData = (data) => async dispatch => {
    let userData = await UserServiceAPI.updateUser(data);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    return dispatch({
        type: UPDATE_USER_DATA,
        payload: userData
    });
};

export const loginUser = (email, password) => async dispatch => {
    try{
        let data = await UserServiceAPI.loginUser(email, password);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        await AsyncStorage.setItem('Auth', data.accessToken);
    }catch(err){
        if(err){
            dispatch({
                type: USER_LOGIN,
                payload: "Wrong email or password"
            });
        }
        throw new Error("Wrong email or password");
    }
    
    
}

export const logoutUser = () => async dispatch => {
    await UserServiceAPI.logoutUser(id);
    await AsyncStorage.clear();
    return dispatch({
        type: USER_LOGOUT
    });
}