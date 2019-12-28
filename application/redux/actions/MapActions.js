import { GET_MAP_MARKERS } from './types';
import MapsServiceAPI from '../../services/Map.service';

export const getMapMarkers = () => dispatch => {
    //let markers = await MapsServiceAPI.getMapMarkers(); //TODO remove comments when ready
    let markers = [
        {
            title: "Default Marker",
            description: "Default description",
            latlng: {
                lat: 37.78825,
                lng: -122.4324,
            }
        }
    ];
    return dispatch({
        type: GET_MAP_MARKERS,
        payload: markers
    });
};
