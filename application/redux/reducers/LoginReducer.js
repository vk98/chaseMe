import { USER_LOGIN } from '../actions/types';

const initialState = {
    message: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                message: action.payload
            };
        default:
            return state;
    }
}
