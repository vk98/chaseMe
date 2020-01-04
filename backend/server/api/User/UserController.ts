import UserService from './UserService';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as bcrypt from 'bcryptjs';
import CarService from '../Car/CarService';
const jwt = require('jsonwebtoken')

export class Controller {

  async login(req: Request, res: Response, next: NextFunction) {
    let user = await UserService.findByEmail(req.body.email);
    const name = { name: req.body.email }

    const accessToken = jwt.sign(name, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
    res.json({ accessToken: accessToken, user: user })
  }

  async addCar(req: Request, res: Response, next: NextFunction) {
    try {
      let car = req.body.car;
      let addedCar = await CarService.create(car);
      let query = { $push: { "cars": `${addedCar._id}` } };
      await UserService.update(addedCar.userId, query);
      res.status(200).send();
    } catch (err) {
      res.status(500).send();
    }
  }

  async acceptFriendInvitation(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.body.userId;
      let friendId = req.body.friendId;
      let query1 = { $push: { "friends": `${friendId}` }, $pull: { "friendRequests": `${friendId}` } };
      let query2 = { $push: { "friends": `${userId}` }, $pull: { "awaitingFriendResponse": `${userId}` } };
      await UserService.update(userId, query1);
      await UserService.update(friendId, query2);
      res.status(200).send();
    } catch (err) {
      res.status(500).send();
    }
  }
  async declineFriendInvitation(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.body.userId;
      let friendId = req.body.friendId;
      let query1 = { $pull: { "friendRequests": `${friendId}` } };
      let query2 = { $pull: { "awaitingFriendResponse": `${userId}` } };
      await UserService.update(userId, query1);
      await UserService.update(friendId, query2);
      res.status(200).send();
    } catch (err) {
      res.status(500).send();
    }
  }

  async cancelFriendRequest(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.body.userId;
      let friendId = req.body.friendId;
      let query1 = { $pull: { "awaitingFriendResponse": `${friendId}` } };
      let query2 = { $pull: { "friendRequests": `${userId}` }, $set: { hasNewFriendRequest: false } };
      await UserService.update(userId, query1);
      await UserService.update(friendId, query2);
      res.status(200).send();
    } catch (err) {
      res.status(500).send();
    }
  }

  async sendFriendRequest(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.body.userId;
      let friendId = req.body.friendId;
      let query1 = { $push: { "awaitingFriendResponse": `${friendId}` } };
      let query2 = { $push: { "friendRequests": `${userId}` }, $set: { hasNewFriendRequest: true } };
      await UserService.update(userId, query1);
      await UserService.update(friendId, query2);
      res.status(200).send();
    } catch (err) {
      res.status(500).send();
    }
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

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await UserService.update(req.params.id, req.body);
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
