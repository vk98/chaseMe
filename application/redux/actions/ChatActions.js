import { GET_CHAT_HISTORY, POST_SEND_MESSAGE, GET_CHAT_ROOMS, CREATE_CHAT_ROOM } from './types';
import ChatServiceAPI from '../../services/Chat.service';

export const getChatHistory = (id) => async dispatch => {
    let messagesRaw = await ChatServiceAPI.getChatHistory(id);
    let messages = messagesRaw.map(message => ({
        ...message, user: { _id: message.senderId }
    }));
    return dispatch({
        type: GET_CHAT_HISTORY,
        payload: messages
    });
};

export const sendMessage = (data) => async dispatch => {
    ChatServiceAPI.sendMessage({
            text: data.message.text,
            roomId: data.roomId,
            senderId: data.senderId
        });
    return dispatch({
        type: POST_SEND_MESSAGE,
        payload: data.message
    });
};

export const getChatRooms = (id) => async dispatch => {
    let chatRooms = await ChatServiceAPI.getChatRooms(id);
    return dispatch({
        type: GET_CHAT_ROOMS,
        payload: chatRooms
    });
};

export const createChatRoom = (data) => async dispatch => {
    await ChatServiceAPI.createChatRoom(data);
    return dispatch({
        type: CREATE_CHAT_ROOM,
        payload: data
    });
};