import Request from './http/HTTPRequest.service'
export class LocationsServiceAPI {
    
    getLocationsList() {
        return Request({
            url: `/locations`,
            method: 'GET'
        });
    }
    /**@param { string } id  */
    getLocation(id){
        return Request({
            url: `/locations/${id}`,
            method: 'GET'
        });
    }

    /**@param { { email: string } } data *///TODO
    createLocation(data){
        return Request({
            url: `/locations/`,
            method: 'POST'
        });
    }

    updateLocation(location) {
        return Request({
            url: `/locations/${id}`,
            method: 'PATCH',
            data: location
        });
    }

    /** @param { string } id */
    deleteLocation(id) {
        return Request({
            url: `/locations/${id}`,
            method: 'DELETE'
        });
    }

}

module.exports = new LocationsServiceAPI();