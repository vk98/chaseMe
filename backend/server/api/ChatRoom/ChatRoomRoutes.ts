import express from 'express';
import ChatRoomController from './ChatRoomController'
export default express.Router()
    .post('/create-chat-room', ChatRoomController.createChatRoom)
    .get('/chat-rooms/:id', ChatRoomController.getRoomsForId)
    .patch('/:id', ChatRoomController.patch)
    .delete('/:id', ChatRoomController.remove);