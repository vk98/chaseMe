import express from 'express';
import ChatController from './ChatController'
export default express.Router()
    .post('/send-message', ChatController.sendMessage)
    .get('/chat-history/:id', ChatController.messagesForRoomId)
    .patch('/:id', ChatController.patch)
    .delete('/:id', ChatController.remove);