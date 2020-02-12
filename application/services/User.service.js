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

    sendFriendRequest(senderId, receiverId){
        return Request({
            url: `/users/send-friend-request`,
            method: "POST",
            data: {
                userId: senderId,
                friendId: receiverId
            }
        })
    }

    acceptFriendRequest(senderId,receiverId){
        return Request({
            url: `/users/accept-friend-request`,
            method: "POST",
            data: {
                userId: senderId,
                friendId: receiverId
            }
        })
    }

    declineFriendRequest(senderId,receiverId){
        return Request({
            url: `/users/decline-friend-request`,
            method: "POST",
            data: {
                userId: senderId,
                friendId: receiverId
            }
        })
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

    /** 
     * @param { string } email
     * @param { string } password
     * @param { string } name
     */
    registerUser(email, password, name){
        return Request({
            url: `/users/register`,
            method: "POST",
            data: { email: email, password: password, name }
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