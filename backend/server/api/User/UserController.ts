import UserService from './UserService';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken')

export class Controller {

  async login(req: Request, res: Response, next: NextFunction) {
    let user = await UserService.findByEmail(req.body.email);
    const name = { name: req.body.email }

    const accessToken = jwt.sign(name, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
    res.json({ accessToken: accessToken, user: user })
  }

  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const docs = await UserService.all();
      return res.status(HttpStatus.OK).json(docs);
    }
    catch (err) {
      return next(err);
    }
  }

  async byId(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await UserService.byId(req.params.id);
      return res.status(HttpStatus.OK).json(doc);
    }
    catch (err) {
      return next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const doc = await UserService.create(req.body);
      return res.status(HttpStatus.CREATED).json(doc);
    }
    catch (err) {
      return next(err);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await UserService.patch(req.params.id, req.body);
      return res.status(HttpStatus.OK).json(doc);
    }
    catch (err) {
      return next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await UserService.remove(req.params.id);
      return res.status(HttpStatus.NO_CONTENT).send();
    }
    catch (err) {
      return next(err);
    }
  }

}

export default new Controller();
