import { GET_USER_PROFILE } from '../actions/types';

const initialState = {
    images: [],
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
        case GET_USER_PROFILE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
