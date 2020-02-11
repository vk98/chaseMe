import Request from './http/HTTPRequest.service'
export class MapsServiceAPI {
    
    getMapMarkers(id) {
        return Request({
            url: `/locations/active-markers/${id}`,
            method: 'GET'
        });
    }

    updateUserLocationMarker(data){
        return Request({
            url: `/locations/update-marker/${data.userId}`,
            method: 'POST',
            data: data
        });
    }

    changeUserLocationMarkerAcitvity(data){
        return Request({
            url: `/locations/update-marker/${data.userId}`,
            method: 'POST',
            data: data
        });
    }
}

module.exports = new MapsServiceAPI();