import express from 'express';
import { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import l from './logger';
import Mongoose from './mongoose';
const passport = require('passport');
const initializePassport = require('../api/passport-config');
initializePassport(passport);

const app = express();
const mongoose = new Mongoose;
const socketio = require("socket.io");
var io = socketio();
var ChatRoomController = require('../api/ChatRoom/ChatRoomController');
const ioActionHandler = require('react-redux-socket/server')(io);
import ChatService from '../api/Chat/ChatService';


export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
    app.use(passport.initialize());
    app.use(passport.session());
    
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    return this;
  }

  listen(p: string | number = process.env.PORT): Application {
    const welcome = port => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}}`);
    http.createServer(app).listen(p, welcome(p));
    this.initSocketIo();
    mongoose.init();
    return app;
  }

  initSocketIo(){
    io.listen(process.env.SOCKET_PORT);
    io.on('connection', client => {
      console.log(client.id);
    })
    const myHandler = function (action, { dispatch, broadcast }, next) {
      switch (action.type) {
        case 'LISTEN_MESSAGES_FROM_SERVER':
          console.log("Emit chat history");
          setInterval(async () => {
            console.log("Emit chat history");
            dispatch({
              type: "GET_CHAT_HISTORY",
              payload: await ChatService.messagesForRoomId(action.payload)
            })
          }, 5000);
          break;
        case 'SUBSCRIBE_TO_TIMER':
          console.log('client is subscribing to timer with interval ', 2000);
          setInterval(() => {
            dispatch({
              type: "UPDATE_TIMER",
              payload: new Date()
            })
          }, 1000);
      }
    }

    ioActionHandler.onActionIn(myHandler);
  }
}
