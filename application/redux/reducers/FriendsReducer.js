import { GET_USERS_FRIENDS, GET_USERS_FRIENDS_REQUESTS } from '../actions/types';

const initialState = {
    friends: [],
    awaitingRequests: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS_FRIENDS:
            return {
                ...state,
                friends: action.payload
            };
        case GET_USERS_FRIENDS_REQUESTS:
            return {
                ...state,
                awaitingRequests: action.payload
            }
        default:
            return state;
    }
}
