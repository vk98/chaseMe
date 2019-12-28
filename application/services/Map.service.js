import Request from './http/HTTPRequest.service'
export class MapsServiceAPI {
    
    getMapMarkers() {
        return Request({
            url: `/maps/markers`,
            method: 'GET'
        });
    }

}

module.exports = new MapsServiceAPI();