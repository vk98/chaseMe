import Request from './http/HTTPRequest.service'
export class UsersServiceAPI {
    getUsersList() {
        return Request({
            url: `/users`,
            method: 'GET'
        });
    }
    getUser(id){
        return Request({
            url: `/users/${id}`,
            method: 'GET'
        });
    }

}

module.exports = new UsersServiceAPI();