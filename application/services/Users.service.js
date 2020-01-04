import Request from './http/HTTPRequest.service'
export class UserServiceAPI {
    
    getUsersList() {
        return Request({
            url: `/users`,
            method: 'GET'
        });
    }
    /**@param { string } id  */
    getUser(id){
        return Request({
            url: `/users/${id}`,
            method: 'GET'
        });
    }

    /**@param { { email: string } } data *///TODO
    createUser(data){
        return Request({
            url: `/users/`,
            method: 'POST'
        });
    }

    
    updateUser(user) {
        return Request({
            url: `/users/${id}`,
            method: 'PATCH',
            data: user
        });
    }

    /** @param { string } id */
    deleteUser(id) {
        return Request({
            url: `/users/${id}`,
            method: 'DELETE'
        });
    }

}

module.exports = new UserServiceAPI();