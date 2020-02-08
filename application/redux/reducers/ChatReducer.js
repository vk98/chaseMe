import { GET_CHAT_HISTORY, CREATE_CHAT_ROOM, POST_SEND_MESSAGE, GET_CHAT_ROOMS } from '../actions/types';

const initialState = {
    currentRoom: {
        messages: [],
        roomId: ''
    },
    chatRooms: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CHAT_HISTORY:
            return {
                ...state,
                currentRoom: {
                    messages: action.payload,
                    roomId: action.payload[0].roomId
                }
            };
        case CREATE_CHAT_ROOM:
            state.chatRooms.unshift(action.payload);
            return {
                ...state
            }
        case GET_CHAT_ROOMS:
            return {
                ...state,
                chatRooms: action.payload
            }
        case POST_SEND_MESSAGE:
            state.currentRoom.messages.shift(action.payload);
            return {
                ...state
            }

        default:
            return state;
    }
}
