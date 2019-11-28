import express from 'express';
import CarController from './CarController'
export default express.Router()
    .post('/', CarController.create)
    .get('/', CarController.all)
    .get('/:id', CarController.byId)
    .patch('/:id', CarController.patch)
    .delete('/:id', CarController.remove);