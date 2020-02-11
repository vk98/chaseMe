import LocationsService from './LocationService';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';

export class Controller {

  async getAllActiveMarkers(req: Request, res: Response, next: NextFunction) {
    try {
      const docs = await LocationsService.getAllActiveMarkers(req.params.id);
      return res.status(HttpStatus.OK).json(docs);
    }
    catch (err) {
      return next(err);
    }
  }

  async byId(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await LocationsService.byId(req.params.id);
      return res.status(HttpStatus.OK).json(doc);
    }
    catch (err) {
      return next(err);
    }
  }

  async createNewMarker(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.updatedAt = new Date();
      const doc = await LocationsService.createNewMarker(req.body);
      return res.status(HttpStatus.CREATED).json(doc);
    }
    catch (err) {
      return next(err);
    }
  }

  async updateExistingMarker(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await LocationsService.updateExistingMarker(req.params.id, req.body);
      return res.status(HttpStatus.OK).json(doc);
    }
    catch (err) {
      return next(err);
    }
  }
  async changeActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await LocationsService.changeActivity(req.params.id, req.body);
      return res.status(HttpStatus.OK).json(doc);
    }
    catch (err) {
      return next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await LocationsService.remove(req.params.id);
      return res.status(HttpStatus.NO_CONTENT).send();
    }
    catch (err) {
      return next(err);
    }
  }

}

export default new Controller();
