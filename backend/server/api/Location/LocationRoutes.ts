import express from 'express';
import LocationController from './LocationController'
export default express.Router()
    .post('/create-marker', LocationController.createNewMarker)
    .post('/update-marker/:id', LocationController.updateExistingMarker)
    .get('/active-markers', LocationController.getAllActiveMarkers)
    .get('/:id', LocationController.byId)
    .delete('/:id', LocationController.remove);