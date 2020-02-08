import Request from './http/HTTPRequest.service'
export class MapsServiceAPI {

    getChatHistory(roomId) {
        return Request({
            url: `/messages/chat-history/${roomId}`,
            method: 'GET'
        });
    }
    sendMessage(message) {
        return Request({
            url: `/messages/send-message`,
            method: 'POST',
            data: message
        });
    }

    getChatRooms(id) {
        return Request({
            url: `/messages/chat-rooms/${id}`,
            method: 'GET',
        });
    }

    createChatRoom(data) {
        return Request({
            url: `/messages/create-chat-room`,
            method: 'POST',
            data: data
        });
    }
}

module.exports = new MapsServiceAPI();