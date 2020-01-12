import { GET_USER_PROFILE } from '../actions/types';

const initialState = {
    user:{
       images: [],
       firstName: '',
       lastName: '',
       email: '',
       friends: [],
       cars: [],
       address: '',
       description: '', 
    }
    
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_PROFILE:
            return {
                    user: {
                        ...action.payload
                    }
                }
        default:
            return state;
    }
}
