import Request from './http/HTTPRequest.service'
export class UserServiceAPI {

    getUsersList() {
        return Request({
            url: `/users`,
            method: 'GET'
        });
    }
    /**@param { string } id  */
    getUser(id) {
        return Request({
            url: `/users/${id}`,
            method: 'GET'
        });
    }

    /**@param { { email: string } } data *///TODO
    createUser(data) {
        return Request({
            url: `/users/`,
            method: 'POST',
            data: data
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

    /** 
     * @param { string } email
     * @param { string } password
     */
    loginUser(email, password) {
        return Request({
            url: `/users/login`,
            method: "POST",
            data: { email: email, password: password }
        });
    }

    logoutUser(){
        return Request({
            url: `/user/logout`,
            method: "POST",
            data: { userId: '324234' }//TODO
        });
    }
}

module.exports = new UserServiceAPI();