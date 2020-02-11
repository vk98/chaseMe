import { GET_MAP_MARKERS, UPDATE_USER_LOCATION_ACTIVITY, UPDATE_USER_LOCATION, UPDATE_ON_REGION_CHANGE } from './types';
import MapsServiceAPI from '../../services/Map.service';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export const getMapMarkers = (id) => async dispatch => {
    console.log(id);
    let markers = await MapsServiceAPI.getMapMarkers(id); //TODO remove comments when ready
    // let markers = [
    //     {
    //         title: "Default Marker",
    //         description: "Default description",
    //         latlng: {
    //             lat: 37.78825,
    //             lng: -122.4324,
    //         }
    //     }
    // ];
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
        onRegionChange(region, location.coords.latitude, location.coords.longitude);
        MapsServiceAPI.updateUserLocationMarker({ userId: id, lat: location.coords.latitude, lon: location.coords.longitude });
        payload = {
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

export const onRegionChange = (region, lastLat, lastLong) => async dispatch => {
    let payload = {
        region: region,
        lastLat: lastLat,
        lastLong: lastLong
    };
    return dispatch({
        type: UPDATE_ON_REGION_CHANGE,
        payload: payload
    });
};
