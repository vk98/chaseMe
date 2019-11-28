import CarsService from './CarService';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';

export class Controller {

  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const docs = await CarsService.all();
      return res.status(HttpStatus.OK).json(docs);
    }
    catch (err) {
      return next(err);
    }
  }

  async byId(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await CarsService.byId(req.params.id);
      return res.status(HttpStatus.OK).json(doc);
    }
    catch (err) {
      return next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await CarsService.create(req.body);
      return res.status(HttpStatus.CREATED).json(doc);
    }
    catch (err) {
      return next(err);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await CarsService.patch(req.params.id, req.body);
      return res.status(HttpStatus.OK).json(doc);
    }
    catch (err) {
      return next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await CarsService.remove(req.params.id);
      return res.status(HttpStatus.NO_CONTENT).send();
    }
    catch (err) {
      return next(err);
    }
  }

}

export default new Controller();
