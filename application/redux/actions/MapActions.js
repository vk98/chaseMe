import { GET_MAP_MARKERS, UPDATE_USER_LOCATION_ACTIVITY, UPDATE_USER_LOCATION, UPDATE_ON_REGION_CHANGE } from './types';
import MapsServiceAPI from '../../services/Map.service';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export const getMapMarkers = (id) => async dispatch => {
    let markers = await MapsServiceAPI.getMapMarkers(id);
    return dispatch({
        type: GET_MAP_MARKERS,
        payload: markers
    });
};

export const updateUserLocationMarker = (id) => async dispatch => {
    let payload = {};
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        console.warn('Permission to access location was denied')
    } else {
        let location = await Location.getCurrentPositionAsync({});
        let region = undefined;
        MapsServiceAPI.updateUserLocationMarker({ userId: id, lat: location.coords.latitude, lon: location.coords.longitude });
        payload = {
            lat: location.coords.latitude, lon: location.coords.longitude
        }
    }

    return dispatch({
        type: UPDATE_USER_LOCATION,
        payload: payload
    });
};

export const changeUserLocationMarkerAcitvity = (data) => async dispatch => {
    await MapsServiceAPI.changeUserLocationMarkerAcitvity({ userId: userId, status: data.status });
    return dispatch({
        type: UPDATE_USER_LOCATION_ACTIVITY,
        payload: { activityStatus: data.status }
    });
};

export const onRegionChange = (region) => async dispatch => {
    let payload = {
        region: region
    };
    return dispatch({
        type: UPDATE_ON_REGION_CHANGE,
        payload: payload
    });
};
