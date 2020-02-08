import UserServiceAPI from '../../services/User.service';
import { GET_USER_DATA, UPDATE_USER_DATA, USER_LOGIN, USER_LOGOUT, GET_USERS_FRIENDS, GET_USER_PROFILE } from '../actions/types';
import { AsyncStorage } from 'react-native';

export const getUserData = () => async dispatch => {
    let userData = JSON.parse(await AsyncStorage.getItem('user'));
    return dispatch({
        type: GET_USER_DATA,
        payload: userData
    });
};

export const getCurrentUserData = () => async dispatch => {
    //let id = JSON.parse(await AsyncStorage.getItem('user'))._id;
    let id = "5e10ccbbc833de5e28f44a77";
    let userData = await UserServiceAPI.getUser(id);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
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

export const getUsersFriends = () => async dispatch => {
    try{
        let friends = JSON.parse(await AsyncStorage.getItem('user')).friends;
        let friendsObjects = [];
        for(let f of friends){
            friendsObjects.push(await UserServiceAPI.getUser(f));
        }
        dispatch({
            type: GET_USERS_FRIENDS,
            payload: friendsObjects
        });
    }catch(err){
        console.warn(err);
        throw new Error("Error while getting friends");
    }
}

export const logoutUser = () => async dispatch => {
    await UserServiceAPI.logoutUser(id);
    await AsyncStorage.clear();
    return dispatch({
        type: USER_LOGOUT
    });
}

export const getUserProfile = (id) => async dispatch => {
    let user = await UserServiceAPI.getUser(id);
    return dispatch({
        type: GET_USER_PROFILE,
        payload: user
    });


}