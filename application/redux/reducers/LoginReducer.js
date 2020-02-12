import { USER_LOGIN_FAILED } from '../actions/types';

const initialState = {
    message: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN_FAILED:
            return {
                ...state,
                message: action.payload
            };
        default:
            return state;
    }
}
