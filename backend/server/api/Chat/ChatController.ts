import ChatService from './ChatService';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import ChatRoomService from '../ChatRoom/ChatRoomService';

export class Controller {

  async messagesForRoomId(req: Request, res: Response, next: NextFunction) {
    try {
      const docs = await ChatService.messagesForRoomId(req.params.id);
      return res.status(HttpStatus.OK).json(docs);
    }
    catch (err) {
      return next(err);
    }
  }

  async byId(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await ChatService.byId(req.params.id);
      return res.status(HttpStatus.OK).json(doc);
    }
    catch (err) {
      return next(err);
    }
  }

  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const message = await ChatService.create(req.body);
      ChatRoomService.updateLastText(message);
      return res.status(HttpStatus.CREATED).json(message);
    }
    catch (err) {
      return next(err);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await ChatService.patch(req.params.id, req.body);
      return res.status(HttpStatus.OK).json(doc);
    }
    catch (err) {
      return next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await ChatService.remove(req.params.id);
      return res.status(HttpStatus.NO_CONTENT).send();
    }
    catch (err) {
      return next(err);
    }
  }

}

export default new Controller();
