import { GET_MAP_MARKERS, UPDATE_USER_LOCATION_ACTIVITY, UPDATE_USER_LOCATION, UPDATE_ON_REGION_CHANGE } from '../actions/types';

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
    myPosition: {
        lastLat: null,
		lastLong: null
    },
    region: {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
    },
    locationObserver: null,
    activityStatus: true
    
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MAP_MARKERS:
            return {
                ...state,
                markers: action.payload
            };
        case UPDATE_USER_LOCATION:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_USER_LOCATION_ACTIVITY:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_ON_REGION_CHANGE:
            return{
                ...state,
                region: action.payload.region || state.region,
                myPosition: {
                    lastLat: action.payload.lastLat || state.lastLat,
                    lastLong: action.payload.lastLong || state.lastLong
                }
            }
        default:
            return state;
    }
}
