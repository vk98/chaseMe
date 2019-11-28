import express from 'express';
import LocationController from './LocationController'
export default express.Router()
    .post('/', LocationController.create)
    .get('/', LocationController.all)
    .get('/:id', LocationController.byId)
    .patch('/:id', LocationController.patch)
    .delete('/:id', LocationController.remove);