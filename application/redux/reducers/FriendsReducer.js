import { GET_USERS_FRIENDS } from '../actions/types';

const initialState = {
    friends: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS_FRIENDS:
            return {
                ...state,
                friends: action.payload
            };
        default:
            return state;
    }
}
