import Request from './http/HTTPRequest.service'
export class CarsServiceAPI {
    
    getCarsList() {
        return Request({
            url: `/cars`,
            method: 'GET'
        });
    }
    /**@param { string } id  */
    getCar(id){
        return Request({
            url: `/cars/${id}`,
            method: 'GET'
        });
    }

    /**@param { { email: string } } data *///TODO
    createCar(data){
        return Request({
            url: `/cars/`,
            method: 'POST'
        });
    }

    updateCar(car) {
        return Request({
            url: `/cars/${id}`,
            method: 'PATCH',
            data: car
        });
    }

    /** @param { string } id */
    deleteCar(id) {
        return Request({
            url: `/cars/${id}`,
            method: 'DELETE'
        });
    }

}

module.exports = new CarsServiceAPI();