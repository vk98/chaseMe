import express from 'express';
const passport = require('passport');
import UserController from './UserController'
const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

export default express.Router()
    .post('/login', passport.authenticate('local'), UserController.login)
    .post('/', UserController.create)
    .get('/', authenticateToken, UserController.all)
    .get('/:id', UserController.byId)
    .patch('/:id', UserController.patch)
    .delete('/:id', UserController.remove);