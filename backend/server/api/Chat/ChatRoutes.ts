import express from 'express';
import ChatController from './ChatController'
export default express.Router()
    .post('/sendMessage', ChatController.sendMessage)
    .get('/:id', ChatController.messagesForId)
    .get('/', ChatController.byId)
    .patch('/:id', ChatController.patch)
    .delete('/:id', ChatController.remove);