import { Types as mongooseTypes } from 'mongoose';
import L from '../../common/logger'
import * as HttpStatus from 'http-status-codes';
import * as errors from "../../common/errors";

import { UserModel as User, IUserModel } from './UserModel';

export class UserService {

  async findById(id: string): Promise<IUserModel> {
    let user = await User.findOne({ id: id }).populate('cars');
    return user;
  }

  async findByEmail(email: string): Promise<IUserModel> {
    const user = await User.findOne({ email: email }).populate('cars');
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

  async getUserById(id: string): Promise<IUserModel> {
    L.info(`fetch user with id ${id}`);

    const doc = await User
      .findOne({ _id: id }).populate('cars')
      .lean()
      .exec() as IUserModel;

    if (!doc) throw new errors.HttpError(HttpStatus.NOT_FOUND);

    return doc;
  }

  async registerUser(userData: IUserModel): Promise<IUserModel> {
    try {
      let sameEmailUser = await User.findOne({email: userData.email});
      if (sameEmailUser) {
        console.log('IFUSserviceReg')
        return;
      }
      const doc = await User.create(userData) as IUserModel;
      L.info(`create user with data ${JSON.stringify(userData)}`);
      return doc;
    } catch (err) {
      L.error(`Error while trying to create user ${JSON.stringify(userData)}`);
    }
  }

  async update(id: string, query: any): Promise<IUserModel> {
    L.info(`update user with id ${id} with data ${JSON.stringify(query)}`);

    const doc = await User
      .findOneAndUpdate({ _id: id }, query, { new: true })
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