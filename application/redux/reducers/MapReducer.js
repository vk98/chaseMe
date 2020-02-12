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
        latitude: 42.65,
        longitude: 23.38,
        latitudeDelta: 0.01922 * 1.0,
        longitudeDelta: 0.01421 * 1.0
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
                myPosition: {
                    lastLat: action.payload.lat,
                    lastLong: action.payload.lon
                }
            }
        case UPDATE_USER_LOCATION_ACTIVITY:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_ON_REGION_CHANGE:
            return{
                ...state,
                region: action.payload.region || state.region
            }
        default:
            return state;
    }
}
