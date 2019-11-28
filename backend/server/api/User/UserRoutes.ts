import express from 'express';
import UserController from './UserController'
export default express.Router()
    .post('/', UserController.create)
    .get('/', UserController.all)
    .get('/:id', UserController.byId)
    .patch('/:id', UserController.patch)
    .delete('/:id', UserController.remove);