import express from 'express';
import ChatRoomController from './ChatRoomController'
const authenticateToken = require('../authorizationConfig');

export default express.Router()
    .post('/create-chat-room', authenticateToken, ChatRoomController.createChatRoom)
    .get('/chat-rooms/:id', authenticateToken, ChatRoomController.getRoomsForId)
    .patch('/:id', ChatRoomController.patch)
    .delete('/:id', ChatRoomController.remove);