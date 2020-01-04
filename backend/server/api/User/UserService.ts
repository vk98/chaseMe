import { Types as mongooseTypes } from 'mongoose';
import L from '../../common/logger'
import * as HttpStatus from 'http-status-codes';
import * as errors from "../../common/errors";

import { UserModel as User, IUserModel } from './UserModel';

export class UserService {

  async findById(id: string): Promise<IUserModel> {
    let user = await User.findOne({ id: id });
    return user;
  }

  async findByEmail(email: string): Promise<IUserModel> {
    let user = await User.findOne({ email: email });
    return user;
  }

  async all(): Promise<IUserModel[]> {
    L.info('fetch all users');

    const docs = await User
      .find()
      .lean()
      .exec() as IUserModel[];

    return docs;
  }

  async byId(id: string): Promise<IUserModel> {
    L.info(`fetch user with id ${id}`);

    if (!mongooseTypes.ObjectId.isValid(id)) throw new errors.HttpError(HttpStatus.BAD_REQUEST);

    const doc = await User
      .findOne({ _id: id })
      .lean()
      .exec() as IUserModel;

    if (!doc) throw new errors.HttpError(HttpStatus.NOT_FOUND);

    return doc;
  }

  async create(userData: IUserModel): Promise<IUserModel> {
    try {
      const user = new User(userData);

      const doc = await user.save() as IUserModel;
      L.info(`create user with data ${JSON.stringify(userData)}`);
      return doc;
    } catch (err) {
      L.error(`Error while trying to create user ${JSON.stringify(userData)}`);
    }
  }

  async patch(id: string, userData: IUserModel): Promise<IUserModel> {
    L.info(`update user with id ${id} with data ${userData}`);

    const doc = await User
      .findOneAndUpdate({ _id: id }, { $set: userData }, { new: true })
      .lean()
      .exec() as IUserModel;

    return doc;
  }

  async remove(id: string): Promise<void> {
    L.info(`delete user with id ${id}`);

    return await User
      .findOneAndRemove({ _id: id })
      .lean()
      .exec();
  }
}

export default new UserService();