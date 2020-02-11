import express from 'express';
const passport = require('passport');
import UserController from './UserController'
const authenticateToken = require('../authorizationConfig');

export default express.Router()
    .post('/login', passport.authenticate('local'), UserController.login)
    .post('/register', UserController.registerUser)
    .post('/add-car', authenticateToken, UserController.addCar)
    .post('/send-friend-request', authenticateToken, UserController.sendFriendRequest)
    .post('/cancel-friend-request', authenticateToken, UserController.cancelFriendRequest)
    .post('/accept-friend-request', authenticateToken, UserController.acceptFriendInvitation)
    .post('/decline-friend-request', authenticateToken, UserController.declineFriendInvitation)
    .get('/', authenticateToken, UserController.all)
    .get('/:id', authenticateToken, UserController.getUserById)
    .patch('/:id', UserController.update)
    .delete('/:id', UserController.remove);