import express from 'express';
import ChatController from './ChatController'
const authenticateToken = require('../authorizationConfig');

export default express.Router()
    .post('/send-message', authenticateToken, ChatController.sendMessage)
    .get('/chat-history/:id', authenticateToken, ChatController.messagesForRoomId)
    .patch('/:id', ChatController.patch)
    .delete('/:id', ChatController.remove);