import { Types as mongooseTypes } from 'mongoose';
import L from '../../common/logger'
import * as HttpStatus from 'http-status-codes';
import * as errors from "../../common/errors";

import { CarModel as Car, ICarModel } from './CarModel';

export class CarsService {

  async all(): Promise<ICarModel[]> {
    L.info('fetch all cars');

    const docs = await Car
      .find()
      .lean()
      .exec() as ICarModel[];

    return docs;
  }

  async byId(id: string): Promise<ICarModel> {
    L.info(`fetch car with id ${id}`);

    if (!mongooseTypes.ObjectId.isValid(id)) throw new errors.HttpError(HttpStatus.BAD_REQUEST);

    const doc = await Car
      .findOne({ _id: id })
      .lean()
      .exec() as ICarModel;

    if (!doc) throw new errors.HttpError(HttpStatus.NOT_FOUND);

    return doc;
  }

  async create(carData: ICarModel): Promise<ICarModel> {
    L.info(`create car with data ${carData}`);

    const car = new Car(carData);

    const doc = await car.save() as ICarModel;

    return doc;
  }

  async patch(id: string, carData: ICarModel): Promise<ICarModel> {
    L.info(`update car with id ${id} with data ${carData}`);

    const doc = await Car
      .findOneAndUpdate({ _id: id }, { $set: carData }, { new: true })
      .lean()
      .exec() as ICarModel;

    return doc;
  }

  async remove(id: string): Promise<void> {
    L.info(`delete car with id ${id}`);

    return await Car
      .findOneAndRemove({ _id: id })
      .lean()
      .exec();
  }
}

export default new CarsService();