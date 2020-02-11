import express from 'express';
import LocationController from './LocationController'
const authenticateToken = require('../authorizationConfig');

export default express.Router()
    .post('/create-marker', authenticateToken, LocationController.createNewMarker)
    .post('/update-marker/:id', authenticateToken, LocationController.updateExistingMarker)
    .post('/change-activity/:id', authenticateToken, LocationController.changeActivity)
    .get('/active-markers/:id', authenticateToken, LocationController.getAllActiveMarkers)
    .get('/:id', LocationController.byId)
    .delete('/:id', LocationController.remove);