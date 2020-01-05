import { GET_USER_DATA, UPDATE_USER_DATA, USER_LOGOUT, USER_LOGIN } from '../actions/types';
const initialState = {
    userImages: [],
    firstName: '',
    lastName: '',
    email: '',
    friends: [],
    cars: [],
    address: '',
    description: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                userImages: action.payload.userImages,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                friends: action.payload.friends,
                cars: action.payload.cars,
                address: action.payload.address,
                description: action.payload.description,
            };
        case UPDATE_USER_DATA:
            return {
                ...state,
                userImages: action.payload.userImages,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                friends: action.payload.friends,
                cars: action.payload.cars,
                address: action.payload.address,
                description: action.payload.description,

            };
        case USER_LOGOUT:
            return{
                ...state
            }
        case USER_LOGIN:
            return{
                ...state,
                userImages: action.payload.userImages,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                friends: action.payload.friends,
                cars: action.payload.cars,
                address: action.payload.address,
                description: action.payload.description,
            }
        default:
            return state;
    }
}
