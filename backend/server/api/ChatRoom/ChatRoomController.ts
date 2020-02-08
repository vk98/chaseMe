import ChatRoomService from './ChatRoomService';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';

export class Controller {

  async getRoomsForId(req: Request, res: Response, next: NextFunction) {
    try {
      const docs = await ChatRoomService.getRoomsForId(req.params.id);
      return res.status(HttpStatus.OK).json(docs);
    }
    catch (err) {
      return next(err);
    }
  }

  async byId(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await ChatRoomService.byId(req.params.id);
      return res.status(HttpStatus.OK).json(doc);
    }
    catch (err) {
      return next(err);
    }
  }

  async createChatRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await ChatRoomService.create(req.body);
      return res.status(HttpStatus.CREATED).json(doc);
    }
    catch (err) {
      return next(err);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await ChatRoomService.patch(req.params.id, req.body);
      return res.status(HttpStatus.OK).json(doc);
    }
    catch (err) {
      return next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await ChatRoomService.remove(req.params.id);
      return res.status(HttpStatus.NO_CONTENT).send();
    }
    catch (err) {
      return next(err);
    }
  }

}

export default new Controller();
