import { GET_MAP_MARKERS } from '../actions/types';

const initialState = {
    markers: [
        {
            title: "Default Marker",
            description: "Default description",
            latlng: {
                lat: 37.78825,
                lng: 42.4324,
            }
        }
    ],
    myPosition: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MAP_MARKERS:
            return {
                ...state,
                markers: action.payload
            };
        default:
            return state;
    }
}
